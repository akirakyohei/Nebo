import _, { isNil } from "lodash";
import barhandles from "barhandles";
import { BarhandlesSchema, FieldSchema } from "../types/schema";

/**
 * Returns a Collection of path
 * objects from a JSON schema
 * @param {Object} schemaObject
 * @param {Object} [parentPath]
 */
export function getPathsFromJSONSchema(
  schemaObject: FieldSchema | FieldSchema[] | FieldSchema["properties"],
  parent: FieldSchema = {}
): FieldSchema[] | undefined {
  if (!_.isObject(schemaObject)) return;

  const items: FieldSchema[] = [];

  _.forOwn(schemaObject, (value, key) => {
    if (!_.isObject(value)) return;

    const path =
      parent.type && parent.type === "array"
        ? parent.path
        : parent.path
          ? `${parent.path}.${key}`
          : key;
    const { type, title } = value as FieldSchema;
    const thisItem = { path, type, title };
    const isPropertiesObject = key === "properties" && !type;
    const isArrayObject = type === "array";

    // Check if this is the properties object of an array
    if (parent.type && parent.type === "array" && isPropertiesObject) {
      const childItems = getPathsFromJSONSchema(
        value as any,
        thisItem
      ) as FieldSchema[];
      items.push(...childItems);
      // check if this is a properties object
    } else if (isPropertiesObject) {
      const childItems = getPathsFromJSONSchema(value as any) as FieldSchema[];
      items.push(...childItems);
      // Check if this is an array object
    } else if (isArrayObject) {
      items.push(thisItem);
      const childItems = getPathsFromJSONSchema(
        (value as any).items,
        thisItem
      ) as FieldSchema[];
      items.push(...childItems);
      // check if this is a regular object
    } else if (type === "object") {
      items.push(thisItem);
      const object = (value as FieldSchema).properties;
      const childItems = getPathsFromJSONSchema(
        object as FieldSchema["properties"],
        thisItem
      ) as FieldSchema[];
      items.push(...childItems);
      // Catchall for text, numbers & boolean
    } else {
      items.push(thisItem);
    }
  });
  return items;
}

export function parseTreeSchema(
  schema: FieldSchema | FieldSchema[] | undefined,
  parent: FieldSchema = {
    type: "string",
  }
) {
  // console.log(schema);
  if (!_.isObject(schema) || _.isEmpty(schema) || !(schema as FieldSchema).type)
    return [];

  const { type, properties, items } = schema as FieldSchema;

  switch (type) {
    case "object": {
      if (isNil(properties)) return [];
      return Object.keys(properties).map((key) => {
        const property = properties[key] as FieldSchema;
        const thisKey = parent?.key ? `${parent?.key}.${key}` : key;
        const thisPath = parent?.type === "array" ? key : thisKey;

        const obj: FieldSchema = {
          key: thisKey,
          title: `${key}`,
          type: property.type,
          path: thisPath,
          icon: () => {},
        };

        const children = parseTreeSchema(property, { key: thisKey, type });

        if (children) obj.children = children;
        return obj;
      });
    }
    case "array": {
      return parseTreeSchema(items, { key: parent.key });
    }
    default:
      return;
  }
}

export function getJsonSchemaFromTemplate(template: string) {
  try {
    if (!template || template === "") return {};
    const barhandlesSchema = barhandles.extractSchema(template);
    return toJsonSchema(barhandlesSchema);
  } catch (error) {
    return error;
  }
}

/**
 * Extracts JSON schema from
 * @param {*} schema
 */
export function toJsonSchema(
  schema: BarhandlesSchema
): FieldSchema | FieldSchema[] | undefined {
  const omitKeys = ["_type", "_optional"];
  if (!_.isObject(schema) || _.isEmpty(schema) || !schema._type) return {};

  switch (schema._type) {
    case "object": {
      let newSchema: FieldSchema = {};
      const keys: string[] = _.keys(schema).filter(
        (key) => !omitKeys.includes(key)
      );

      // Check if barhandles marked an array as an object and fix it
      const isArray = keys.every((key) => !Number.isNaN(parseInt(key)));
      if (isArray && keys.length > 0) {
        newSchema = {
          type: "array",
          items: toJsonSchema(
            schema[keys[0] as string] as BarhandlesSchema
          ) as FieldSchema[],
        };
        return newSchema;
      }
      newSchema = { type: "object", properties: {} };
      _.each(keys, (key) => {
        (newSchema as any).properties[key] = toJsonSchema(
          schema[key] as BarhandlesSchema
        );
      });
      return newSchema;
    }
    case "array": {
      const newSchema: FieldSchema = { type: "array" };
      newSchema.items = toJsonSchema(
        schema["#"] as BarhandlesSchema
      ) as FieldSchema[];
      return newSchema;
    }
    case "any": {
      const newSchema: FieldSchema = { type: "string" };
      return newSchema;
    }
    default:
      return;
  }
}

function isValidType(value: any, type: string) {
  switch (type) {
    case "array":
      return _.isArray(value);
    case "object":
      return _.isObject(value);
    default:
      return typeof value === type;
  }
}

export const pickWithJsonSchema = (
  schema: FieldSchema | FieldSchema[] | undefined = {},
  data: any
): any => {
  const { type, items, properties = {} } = schema as FieldSchema;

  if (_.isEmpty(schema)) return {};
  if (_.isNil(data)) return;

  switch (type) {
    case "object": {
      const result: Record<string, any> = {};
      _.forIn(properties, (value, key) => {
        const childData = data[key];
        if (_.isNil(childData)) return;
        const validDataType = isValidType(
          childData,
          ((value as FieldSchema)?.type || "") as string
        );
        if (!validDataType) return;
        result[key] = pickWithJsonSchema(value as FieldSchema, data[key]);
      });
      return result;
    }
    case "array": {
      return _.isArray(data)
        ? data.map((object) => pickWithJsonSchema(items, object))
        : undefined;
    }
    default:
      return data;
  }
};

export const pickFromJsonSchema = (schema: FieldSchema, keys: string[]) => ({
  ...schema,
  properties: keys.reduce((accumulator, key) => {
    if (!schema?.properties || typeof schema?.properties[key] === "undefined")
      return accumulator;
    return {
      ...accumulator,
      [key]: schema.properties[key],
    };
  }, {}),
  required: schema?.required?.filter((req) => keys.includes(req)),
});

const JsonUtils = {
  getPathsFromJSONSchema,
  parseTreeSchema,
  getJsonSchemaFromTemplate,
  toJsonSchema,
  pickWithJsonSchema,
  pickFromJsonSchema,
};

export default JsonUtils;

import { Editor, WebEditor } from "@repo/web-builder";
import "./style.css";
import { usePlugin } from "grapesjs";
import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { Template } from "../../types";
import {
  useCreateTemplateMutation,
  useGetTemplatesWithInfiniteQuery,
  useUpdateTemplateMutation,
} from "../../data/template.api";
import { useSimpleFilters } from "../../utils/useSimpleFilters";
import { TemplateManagerPlugin } from "./plugin/template-manage/template.manage";
import { useToggle } from "../../utils/useToggle";
import { TemplateSaveModal } from "./components/TemplateSaveModal";

interface Props {
  isCreate?: boolean;
  id?: number;
  template: Template;
}

export const WebBuilder = ({ isCreate, id, template }: Props) => {
  const ref = useRef<Editor | null>(null);
  const { value: isOpenSaveTemplate, toggle: toggleSaveTemplate } =
    useToggle(false);
  const navigate = useNavigate();
  const { query, debounceQuery, limit, page, changeDebounceQuery, changePage } =
    useSimpleFilters(20);
  const { data: templates = [], isFetching: isFetchingTemplates } =
    useGetTemplatesWithInfiniteQuery({
      owner: false,
      limit,
      page: page,
      query: debounceQuery,
    });

  useEffect(() => {
    return () => {
      const editor = WebEditor({
        title: "moiws",
        storageManager: {
          type: "local",
        },
        deviceManager: {
          devices: [
            {
              name: "custom",
              width: `${template.width}px`,
              height: `${template.height}px`,
            },
          ],
        },
        plugins: [
          usePlugin(TemplateManagerPlugin, {
            onSaveTemplate(editor) {
              toggleSaveTemplate();
            },
          }),
        ],
      });
      editor.onReady(() => {
        editor.Panels.addPanel({
          id: "left-group-actions-panel",
          el: ".panel__left-group-actions",
        });
        const leftGroupPanel = editor.Panels.addPanel({
          id: "left-group-btn-actions",
          el: ".left-group-btn-actions",
          buttons: [],
        });
        const leftGroupButtons = leftGroupPanel?.get("buttons");
        if (!leftGroupButtons?.get("back-btn")) {
          leftGroupButtons?.add(
            [
              {
                id: "back-btn",
                className: "btn-toggle-borders",
                attributes: {
                  title: "back",
                },
                label: `${renderToString(
                  <a href="/" className="link-btn">
                    <i
                      className="fa fa-chevron-circle-left"
                      aria-hidden="true"
                    ></i>
                    back
                  </a>
                )}`,
                command: (_editor: any) => {
                  navigate("/");
                },
              },
            ],
            { merge: true, temporary: true }
          );
          editor.render();
        }
        ref.current = editor;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(ref.current?.storeData());
  }, [ref.current?.storeData]);
  return (
    <Box>
      <Box>
        <Box className="panel__left-group-actions">
          <Box className="left-group-btn-actions"></Box>
        </Box>
        <Box id="gjs"></Box>
        <Box id="block"></Box>
      </Box>
      <Box>
        {isOpenSaveTemplate && (
          <TemplateSaveModal
            onClose={toggleSaveTemplate}
            isCreate={isCreate}
            id={id}
            template={{ ...template, data: ref.current?.storeData() }}
          />
        )}
      </Box>
    </Box>
  );
};

export default WebBuilder;

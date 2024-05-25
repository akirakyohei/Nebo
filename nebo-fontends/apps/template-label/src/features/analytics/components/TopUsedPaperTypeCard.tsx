import { Card, CardContent, Typography } from "@mui/material";
import { TopUsedPaperType } from "../../../types";
interface Props {
  topUsedPaperTypes: TopUsedPaperType[];
}

export const TopUsedPaperTypeCard = ({ topUsedPaperTypes }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Top used paper type
        </Typography>
      </CardContent>
    </Card>
  );
};

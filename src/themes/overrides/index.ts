import { merge } from "lodash";
import { Theme } from "@mui/material";

import Tab from "./Tab";
import Chip from "./Chip";
import Tabs from "./Tabs";
import Link from "./Link";
import Badge from "./Badge";
import Button from "./Button";
import Checkbox from "./Checkbox";
import TableCell from "./TableCell";
import IconButton from "./IconButton";
import InputLabel from "./InputLabel";
import Typography from "./Typography";
import CardContent from "./CardContent";
import ListItemIcon from "./ListItemIcon";
import OutlinedInput from "./OutlinedInput";
import LinearProgress from "./LinearProgress";

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Button(theme),
    Badge(theme),
    CardContent(),
    Checkbox(theme),
    Chip(theme),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemIcon(),
    OutlinedInput(theme),
    Tab(theme),
    TableCell(theme),
    Tabs(),
    Typography()
  );
}

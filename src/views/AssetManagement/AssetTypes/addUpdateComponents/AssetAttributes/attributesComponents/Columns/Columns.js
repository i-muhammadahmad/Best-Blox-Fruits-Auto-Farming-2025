import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("field_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Field Name",
  }),
  createColumn("field_tip", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Field Tip",
  }),
  createColumn("priority", {
    dataType: ColumnDataType.Float,
    sortable: true,
    filterable: true,
    label: "Priority",
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 1,
  }),
  createColumn("is_required_html", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Is Required",
  }),
  createColumn("description_html", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Description",
  }),
  createColumn("date_last_modified", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    label: "Last Modified At",
  }),
  createColumn("updated_by_user_name", {
    dataType: ColumnDataType.String,
    filterable: true,
    sortable: true,
    label: "Modified By",
  }),
  createColumn("Actions"),
];
export default Columns;

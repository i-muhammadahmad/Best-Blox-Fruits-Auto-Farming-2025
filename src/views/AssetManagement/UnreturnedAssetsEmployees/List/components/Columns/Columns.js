import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("profile_pic_icon",{
    dataType: ColumnDataType.String,
    sortable: false,
    filterable: false,
    searchable: false,
    label: "Profile Pic",
  }),
  createColumn("employee_code",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Employee Code",
  }),
  createColumn("firstname",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "First Nmae",
  }),
  createColumn("lastname",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Last Nmae",
  }),
  createColumn("email",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Email",
  }),
  createColumn("office_name",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Office",
  }),
  createColumn("employee_assets",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Unreturned Assets",
  }),
  createColumn("employee_clients",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Clients",
  }),
  createColumn("description_html",{
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Description",
  }),
  createColumn("date_last_modified", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    searchable: true,
    label: "Last Modified At",
    sortDirection: ColumnSortDirection.Descending,
    sortOrder: 1,
  }),
  createColumn("Actions"),
];
export default Columns;

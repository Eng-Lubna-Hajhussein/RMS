import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // fetch("https://swapi-deno.azurewebsites.net/api/starships") //alternative to swapi.dev
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
    /* eslint-disable  @typescript-eslint/no-use-before-define */
    setData(altData);
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.model}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.manufacturer}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.length}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page"
                  }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                //ActionsComponent={TablePaginationActions}
                //component={Box}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: "secondary"
                }}
                nextIconButtonProps={{ color: "secondary" }}
                showFirstButton={true}
                showLastButton={true}
                labelRowsPerPage={<span>Rows:</span>}
                sx={{
                  ".MuiTablePagination-toolbar": {
                    backgroundColor: "rgba(100,100,100,0.5)"
                  },
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                    fontWeight: "bold",
                    color: "blue"
                  }
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <div style={{ marginTop: 24 }}>
        <a
          target="_blank"
          href="https://smartdevpreneur.com/the-ultimate-guide-to-material-ui-table-pagination/"
        >
          Here's everything you need to know about Material-UI Table Pagination
        </a>
      </div>
    </>
  );
}

const altData = [
  {
    name: "CR90 corvette",
    model: "CR90 corvette",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "3500000",
    length: "150",
    max_atmosphering_speed: "950",
    crew: "30-165",
    passengers: "600",
    cargo_capacity: "3000000",
    consumables: "1 year",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "corvette",
    pilots: [],
    films: [1, 3, 6],
    created: "2014-12-10T14:20:33.369000Z",
    edited: "2014-12-20T21:23:49.867000Z",
    url: 2
  },
  {
    name: "Star Destroyer",
    model: "Imperial I-class Star Destroyer",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: "150000000",
    length: "1,600",
    max_atmosphering_speed: "975",
    crew: "47,060",
    passengers: "n/a",
    cargo_capacity: "36000000",
    consumables: "2 years",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "Star Destroyer",
    pilots: [],
    films: [1, 2, 3],
    created: "2014-12-10T15:08:19.848000Z",
    edited: "2014-12-20T21:23:49.870000Z",
    url: 3
  },
  {
    name: "Sentinel-class landing craft",
    model: "Sentinel-class landing craft",
    manufacturer: "Sienar Fleet Systems, Cyngus Spaceworks",
    cost_in_credits: "240000",
    length: "38",
    max_atmosphering_speed: "1000",
    crew: "5",
    passengers: "75",
    cargo_capacity: "180000",
    consumables: "1 month",
    hyperdrive_rating: "1.0",
    MGLT: "70",
    starship_class: "landing craft",
    pilots: [],
    films: [1],
    created: "2014-12-10T15:48:00.586000Z",
    edited: "2014-12-20T21:23:49.873000Z",
    url: 5
  },
  {
    name: "Death Star",
    model: "DS-1 Orbital Battle Station",
    manufacturer:
      "Imperial Department of Military Research, Sienar Fleet Systems",
    cost_in_credits: "1000000000000",
    length: "120000",
    max_atmosphering_speed: "n/a",
    crew: "342,953",
    passengers: "843,342",
    cargo_capacity: "1000000000000",
    consumables: "3 years",
    hyperdrive_rating: "4.0",
    MGLT: "10",
    starship_class: "Deep Space Mobile Battlestation",
    pilots: [],
    films: [1],
    created: "2014-12-10T16:36:50.509000Z",
    edited: "2014-12-20T21:26:24.783000Z",
    url: 9
  },
  {
    name: "Millennium Falcon",
    model: "YT-1300 light freighter",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "100000",
    length: "34.37",
    max_atmosphering_speed: "1050",
    crew: "4",
    passengers: "6",
    cargo_capacity: "100000",
    consumables: "2 months",
    hyperdrive_rating: "0.5",
    MGLT: "75",
    starship_class: "Light freighter",
    pilots: [13, 14, 25, 31],
    films: [1, 2, 3],
    created: "2014-12-10T16:59:45.094000Z",
    edited: "2014-12-20T21:23:49.880000Z",
    url: 10
  },
  {
    name: "Y-wing",
    model: "BTL Y-wing",
    manufacturer: "Koensayr Manufacturing",
    cost_in_credits: "134999",
    length: "14",
    max_atmosphering_speed: "1000km",
    crew: "2",
    passengers: "0",
    cargo_capacity: "110",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "80",
    starship_class: "assault starfighter",
    pilots: [],
    films: [1, 2, 3],
    created: "2014-12-12T11:00:39.817000Z",
    edited: "2014-12-20T21:23:49.883000Z",
    url: 11
  },
  {
    name: "X-wing",
    model: "T-65 X-wing",
    manufacturer: "Incom Corporation",
    cost_in_credits: "149999",
    length: "12.5",
    max_atmosphering_speed: "1050",
    crew: "1",
    passengers: "0",
    cargo_capacity: "110",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "100",
    starship_class: "Starfighter",
    pilots: [1, 9, 18, 19],
    films: [1, 2, 3],
    created: "2014-12-12T11:19:05.340000Z",
    edited: "2014-12-20T21:23:49.886000Z",
    url: 12
  },
  {
    name: "TIE Advanced x1",
    model: "Twin Ion Engine Advanced x1",
    manufacturer: "Sienar Fleet Systems",
    cost_in_credits: "unknown",
    length: "9.2",
    max_atmosphering_speed: "1200",
    crew: "1",
    passengers: "0",
    cargo_capacity: "150",
    consumables: "5 days",
    hyperdrive_rating: "1.0",
    MGLT: "105",
    starship_class: "Starfighter",
    pilots: [4],
    films: [1],
    created: "2014-12-12T11:21:32.991000Z",
    edited: "2014-12-20T21:23:49.889000Z",
    url: 13
  },
  {
    name: "Executor",
    model: "Executor-class star dreadnought",
    manufacturer: "Kuat Drive Yards, Fondor Shipyards",
    cost_in_credits: "1143350000",
    length: "19000",
    max_atmosphering_speed: "n/a",
    crew: "279,144",
    passengers: "38000",
    cargo_capacity: "250000000",
    consumables: "6 years",
    hyperdrive_rating: "2.0",
    MGLT: "40",
    starship_class: "Star dreadnought",
    pilots: [],
    films: [2, 3],
    created: "2014-12-15T12:31:42.547000Z",
    edited: "2014-12-20T21:23:49.893000Z",
    url: 15
  },
  {
    name: "Rebel transport",
    model: "GR-75 medium transport",
    manufacturer: "Gallofree Yards, Inc.",
    cost_in_credits: "unknown",
    length: "90",
    max_atmosphering_speed: "650",
    crew: "6",
    passengers: "90",
    cargo_capacity: "19000000",
    consumables: "6 months",
    hyperdrive_rating: "4.0",
    MGLT: "20",
    starship_class: "Medium transport",
    pilots: [],
    films: [2, 3],
    created: "2014-12-15T12:34:52.264000Z",
    edited: "2014-12-20T21:23:49.895000Z",
    url: 17
  },
  {
    name: "Slave 1",
    model: "Firespray-31-class patrol and attack",
    manufacturer: "Kuat Systems Engineering",
    cost_in_credits: "unknown",
    length: "21.5",
    max_atmosphering_speed: "1000",
    crew: "1",
    passengers: "6",
    cargo_capacity: "70000",
    consumables: "1 month",
    hyperdrive_rating: "3.0",
    MGLT: "70",
    starship_class: "Patrol craft",
    pilots: [22],
    films: [2, 5],
    created: "2014-12-15T13:00:56.332000Z",
    edited: "2014-12-20T21:23:49.897000Z",
    url: 21
  },
  {
    name: "Imperial shuttle",
    model: "Lambda-class T-4a shuttle",
    manufacturer: "Sienar Fleet Systems",
    cost_in_credits: "240000",
    length: "20",
    max_atmosphering_speed: "850",
    crew: "6",
    passengers: "20",
    cargo_capacity: "80000",
    consumables: "2 months",
    hyperdrive_rating: "1.0",
    MGLT: "50",
    starship_class: "Armed government transport",
    pilots: [1, 13, 14],
    films: [2, 3],
    created: "2014-12-15T13:04:47.235000Z",
    edited: "2014-12-20T21:23:49.900000Z",
    url: 22
  },
  {
    name: "EF76 Nebulon-B escort frigate",
    model: "EF76 Nebulon-B escort frigate",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: "8500000",
    length: "300",
    max_atmosphering_speed: "800",
    crew: "854",
    passengers: "75",
    cargo_capacity: "6000000",
    consumables: "2 years",
    hyperdrive_rating: "2.0",
    MGLT: "40",
    starship_class: "Escort ship",
    pilots: [],
    films: [2, 3],
    created: "2014-12-15T13:06:30.813000Z",
    edited: "2014-12-20T21:23:49.902000Z",
    url: 23
  },
  {
    name: "Calamari Cruiser",
    model: "MC80 Liberty type Star Cruiser",
    manufacturer: "Mon Calamari shipyards",
    cost_in_credits: "104000000",
    length: "1200",
    max_atmosphering_speed: "n/a",
    crew: "5400",
    passengers: "1200",
    cargo_capacity: "unknown",
    consumables: "2 years",
    hyperdrive_rating: "1.0",
    MGLT: "60",
    starship_class: "Star Cruiser",
    pilots: [],
    films: [3],
    created: "2014-12-18T10:54:57.804000Z",
    edited: "2014-12-20T21:23:49.904000Z",
    url: 27
  },
  {
    name: "A-wing",
    model: "RZ-1 A-wing Interceptor",
    manufacturer: "Alliance Underground Engineering, Incom Corporation",
    cost_in_credits: "175000",
    length: "9.6",
    max_atmosphering_speed: "1300",
    crew: "1",
    passengers: "0",
    cargo_capacity: "40",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "120",
    starship_class: "Starfighter",
    pilots: [29],
    films: [3],
    created: "2014-12-18T11:16:34.542000Z",
    edited: "2014-12-20T21:23:49.907000Z",
    url: 28
  },
  {
    name: "B-wing",
    model: "A/SF-01 B-wing starfighter",
    manufacturer: "Slayn & Korpil",
    cost_in_credits: "220000",
    length: "16.9",
    max_atmosphering_speed: "950",
    crew: "1",
    passengers: "0",
    cargo_capacity: "45",
    consumables: "1 week",
    hyperdrive_rating: "2.0",
    MGLT: "91",
    starship_class: "Assault Starfighter",
    pilots: [],
    films: [3],
    created: "2014-12-18T11:18:04.763000Z",
    edited: "2014-12-20T21:23:49.909000Z",
    url: 29
  },
  {
    name: "Republic Cruiser",
    model: "Consular-class cruiser",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "unknown",
    length: "115",
    max_atmosphering_speed: "900",
    crew: "9",
    passengers: "16",
    cargo_capacity: "unknown",
    consumables: "unknown",
    hyperdrive_rating: "2.0",
    MGLT: "unknown",
    starship_class: "Space cruiser",
    pilots: [],
    films: [4],
    created: "2014-12-19T17:01:31.488000Z",
    edited: "2014-12-20T21:23:49.912000Z",
    url: 31
  },
  {
    name: "Droid control ship",
    model: "Lucrehulk-class Droid Control Ship",
    manufacturer: "Hoersch-Kessel Drive, Inc.",
    cost_in_credits: "unknown",
    length: "3170",
    max_atmosphering_speed: "n/a",
    crew: "175",
    passengers: "139000",
    cargo_capacity: "4000000000",
    consumables: "500 days",
    hyperdrive_rating: "2.0",
    MGLT: "unknown",
    starship_class: "Droid control ship",
    pilots: [],
    films: [4, 5, 6],
    created: "2014-12-19T17:04:06.323000Z",
    edited: "2014-12-20T21:23:49.915000Z",
    url: 32
  },
  {
    name: "Naboo fighter",
    model: "N-1 starfighter",
    manufacturer: "Theed Palace Space Vessel Engineering Corps",
    cost_in_credits: "200000",
    length: "11",
    max_atmosphering_speed: "1100",
    crew: "1",
    passengers: "0",
    cargo_capacity: "65",
    consumables: "7 days",
    hyperdrive_rating: "1.0",
    MGLT: "unknown",
    starship_class: "Starfighter",
    pilots: [11, 35, 60],
    films: [4, 5],
    created: "2014-12-19T17:39:17.582000Z",
    edited: "2014-12-20T21:23:49.917000Z",
    url: 39
  },
  {
    name: "Naboo Royal Starship",
    model: "J-type 327 Nubian royal starship",
    manufacturer:
      "Theed Palace Space Vessel Engineering Corps, Nubia Star Drives",
    cost_in_credits: "unknown",
    length: "76",
    max_atmosphering_speed: "920",
    crew: "8",
    passengers: "unknown",
    cargo_capacity: "unknown",
    consumables: "unknown",
    hyperdrive_rating: "1.8",
    MGLT: "unknown",
    starship_class: "yacht",
    pilots: [39],
    films: [4],
    created: "2014-12-19T17:45:03.506000Z",
    edited: "2014-12-20T21:23:49.919000Z",
    url: 40
  },
  {
    name: "Scimitar",
    model: "Star Courier",
    manufacturer: "Republic Sienar Systems",
    cost_in_credits: "55000000",
    length: "26.5",
    max_atmosphering_speed: "1180",
    crew: "1",
    passengers: "6",
    cargo_capacity: "2500000",
    consumables: "30 days",
    hyperdrive_rating: "1.5",
    MGLT: "unknown",
    starship_class: "Space Transport",
    pilots: [44],
    films: [4],
    created: "2014-12-20T09:39:56.116000Z",
    edited: "2014-12-20T21:23:49.922000Z",
    url: 41
  },
  {
    name: "J-type diplomatic barge",
    model: "J-type diplomatic barge",
    manufacturer:
      "Theed Palace Space Vessel Engineering Corps, Nubia Star Drives",
    cost_in_credits: "2000000",
    length: "39",
    max_atmosphering_speed: "2000",
    crew: "5",
    passengers: "10",
    cargo_capacity: "unknown",
    consumables: "1 year",
    hyperdrive_rating: "0.7",
    MGLT: "unknown",
    starship_class: "Diplomatic barge",
    pilots: [],
    films: [5],
    created: "2014-12-20T11:05:51.237000Z",
    edited: "2014-12-20T21:23:49.925000Z",
    url: 43
  },
  {
    name: "AA-9 Coruscant freighter",
    model: "Botajef AA-9 Freighter-Liner",
    manufacturer: "Botajef Shipyards",
    cost_in_credits: "unknown",
    length: "390",
    max_atmosphering_speed: "unknown",
    crew: "unknown",
    passengers: "30000",
    cargo_capacity: "unknown",
    consumables: "unknown",
    hyperdrive_rating: "unknown",
    MGLT: "unknown",
    starship_class: "freighter",
    pilots: [],
    films: [5],
    created: "2014-12-20T17:24:23.509000Z",
    edited: "2014-12-20T21:23:49.928000Z",
    url: 47
  },
  {
    name: "Jedi starfighter",
    model: "Delta-7 Aethersprite-class interceptor",
    manufacturer: "Kuat Systems Engineering",
    cost_in_credits: "180000",
    length: "8",
    max_atmosphering_speed: "1150",
    crew: "1",
    passengers: "0",
    cargo_capacity: "60",
    consumables: "7 days",
    hyperdrive_rating: "1.0",
    MGLT: "unknown",
    starship_class: "Starfighter",
    pilots: [10, 58],
    films: [5, 6],
    created: "2014-12-20T17:35:23.906000Z",
    edited: "2014-12-20T21:23:49.930000Z",
    url: 48
  },
  {
    name: "H-type Nubian yacht",
    model: "H-type Nubian yacht",
    manufacturer: "Theed Palace Space Vessel Engineering Corps",
    cost_in_credits: "unknown",
    length: "47.9",
    max_atmosphering_speed: "8000",
    crew: "4",
    passengers: "unknown",
    cargo_capacity: "unknown",
    consumables: "unknown",
    hyperdrive_rating: "0.9",
    MGLT: "unknown",
    starship_class: "yacht",
    pilots: [35],
    films: [5],
    created: "2014-12-20T17:46:46.847000Z",
    edited: "2014-12-20T21:23:49.932000Z",
    url: 49
  },
  {
    name: "Republic Assault ship",
    model: "Acclamator I-class assault ship",
    manufacturer: "Rothana Heavy Engineering",
    cost_in_credits: "unknown",
    length: "752",
    max_atmosphering_speed: "unknown",
    crew: "700",
    passengers: "16000",
    cargo_capacity: "11250000",
    consumables: "2 years",
    hyperdrive_rating: "0.6",
    MGLT: "unknown",
    starship_class: "assault ship",
    pilots: [],
    films: [5],
    created: "2014-12-20T18:08:42.926000Z",
    edited: "2014-12-20T21:23:49.935000Z",
    url: 52
  },
  {
    name: "Solar Sailer",
    model: "Punworcca 116-class interstellar sloop",
    manufacturer: "Huppla Pasa Tisc Shipwrights Collective",
    cost_in_credits: "35700",
    length: "15.2",
    max_atmosphering_speed: "1600",
    crew: "3",
    passengers: "11",
    cargo_capacity: "240",
    consumables: "7 days",
    hyperdrive_rating: "1.5",
    MGLT: "unknown",
    starship_class: "yacht",
    pilots: [],
    films: [5],
    created: "2014-12-20T18:37:56.969000Z",
    edited: "2014-12-20T21:23:49.937000Z",
    url: 58
  },
  {
    name: "Trade Federation cruiser",
    model: "Providence-class carrier/destroyer",
    manufacturer: "Rendili StarDrive, Free Dac Volunteers Engineering corps.",
    cost_in_credits: "125000000",
    length: "1088",
    max_atmosphering_speed: "1050",
    crew: "600",
    passengers: "48247",
    cargo_capacity: "50000000",
    consumables: "4 years",
    hyperdrive_rating: "1.5",
    MGLT: "unknown",
    starship_class: "capital ship",
    pilots: [10, 11],
    films: [6],
    created: "2014-12-20T19:40:21.902000Z",
    edited: "2014-12-20T21:23:49.941000Z",
    url: 59
  }
];

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 600
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
}));

function LoanPayouts() {
    const classes = useStyles();
    const [filter, setFilter] = React.useState(1);

    const handleChange = (event) => {
      setFilter(event.target.value);
    };

    const series = [{
        name: 'Merchants Loan Processing Breakdown',
        data: [1278, 3901, 900, 1632, 2352, 430, 5021, 3034, 1360]
      }];

      const options = {
        annotations: {
          points: [{
            x: 'Bananas',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Bananas are good',
            }
          }]
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: ['TV Sales & Hire', 'OK Mart', 'Mohammad Musa', 'Creative Car Sale', 'Rawson Properties', 'Edgars', 'CMAS', 'Tashaz Furnitures', 'Power Sales'],
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Merchants Loan Processing (USD $)',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
      };

    return (
        <div>
          <Box display="flex" alignItems="center" style={{marginBottom: '10px'}}>
            <Box flexGrow={1}>
              <Typography className={classes.header} variant="subtitle2" gutterBottom>
                Merchants Loan Processing Breakdown
              </Typography>
            </Box>
          </Box>
          <ReactApexChart options={options} series={series} type="bar" height={380} />
        </div>
    )
}

export default LoanPayouts

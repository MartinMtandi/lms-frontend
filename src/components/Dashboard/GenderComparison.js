import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import loader from '../../assets/Iphone-spinner-2.gif';

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 600
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  loader: {
    height: '392px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));


function GenderComparison(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState([]);
    const [data, setData] = React.useState([]);
    const { dashboard_reports, dashboard_reports_loading } = props.getReportsReducer;


    React.useEffect(() => {
        if(dashboard_reports){
          let val = [];
          let dt = [];

          dashboard_reports.clientsbygender.forEach(v => val.push(Number(v.total)));
          dashboard_reports.clientsbygender.forEach(v => dt.push(v.gender));

          setValue(val);
          setData(dt);
        }
    }, [dashboard_reports]);

    const series = value;

    const options = {
      chart: {
        type: 'donut',
      },
      labels: data,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    let content = (dashboard_reports_loading) ? <div className={classes.loader}>
      <img src={loader} alt="loader" />
    </div> : (data && value) && <>
      <Box display="flex" alignItems="center" style={{marginBottom: '10px'}}>
        <Box flexGrow={1}>
          <Typography className={classes.header} variant="subtitle2" gutterBottom>
              Gender Comparison
          </Typography>
        </Box>
      </Box>
      <ReactApexChart options={options} series={series} type="donut" height={392} />
    </>

    return (
        <div id="chart">
           {content}
        </div>
    )
}

export default GenderComparison;

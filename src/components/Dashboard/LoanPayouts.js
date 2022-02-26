import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
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

function LoanPayouts(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState([]);
    const [data, setData] = React.useState([]);
    const {dashboard_reports, dashboard_reports_loading} = props.getReportsReducer;

    React.useEffect(() => {
      if(dashboard_reports){
          let val = [];
          let dt = [];
          dashboard_reports.agent_processing.forEach(v => val.push(Number(v.total)));
          dashboard_reports.agent_processing.forEach(v => dt.push(v.agent));
          setValue(val);
          setData(dt);
      }
    }, [dashboard_reports]);

    const series = [{
        name: 'Total Amount Paid ($)',
        data: value
      }];

      const options = {
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
          categories: data,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Loan Payments (USD $)',
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

      let content = (dashboard_reports_loading) ? <div className={classes.loader}>
      <img src={loader} alt="loader" />
    </div> : <div>
          <Box display="flex" alignItems="center" style={{marginBottom: '10px'}}>
            <Box flexGrow={1}>
              <Typography className={classes.header} variant="subtitle2" gutterBottom>
                  Loan Payments Breakdown
              </Typography>
            </Box>
          </Box>
          <ReactApexChart options={options} series={series} type="bar" height={380} />
        </div>

    return (
        <div>
          {content}
        </div>
    )
}

LoanPayouts.propTypes = {

}

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, actions)(LoanPayouts)

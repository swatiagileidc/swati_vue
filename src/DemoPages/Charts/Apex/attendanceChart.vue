<template>
  <div class="example">
    <apexchart height="350" type="line" :options="chartOptions" :series="series"></apexchart>
    <div class="text-center">
      <button @click="updateChart" class="btn btn-primary">Update!</button>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "LineExample",
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    
    return {
      
      chartOptions: {
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003"
          ]
        }
      },
      series: [
        {
          name: "Science",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          name: "Maths",
          data: [23, 43, 54, 12, 44, 52, 32, 11]
        }
        ,
        {
          name: "Science",
          data: [26, 42, 64, 72, 85, 90, 92, 51]
        }
      ]
    };
  },
  methods: {
    generateDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    },
    updateChart() {
      let series = [
        {
          name: "Science",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        },
        {
          name: "Maths",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 20
            }
          )
        },

        {
          name: "Science",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            20,
            {
              min: 10,
              max: 15
            }
          )
        }
      ];

      this.series = series;
    }
  }
};
</script>
<style>

.top-selection {
        position: absolute;
    top: 100px;
    right: 31px;
    z-index: 20000;
}.sub-button {
    background: rgb(247 185 36);
    color: #fff;
    transition: all 0.2s;
    padding: 8px 18px !important;
    border-radius: 5px;
}

</style>

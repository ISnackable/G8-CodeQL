<template>
  <div class="visits-page">
    <h1 class="page-title">Dashboard &nbsp;
      <small>
        <small>CodeQL Scanner</small>
      </small>
    </h1>
    <b-row>
      <b-col lg="12">
        <Widget class="bg-Transparent">
          <UploadFile />
          <font-awesome-icon icon="user-secret" />
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="7">
        <Widget class="bg-transparent">
          <p> Insert Neo4J Graph here </p>
        </Widget>
      </b-col>
      <b-col lg="4" offset-lg="1">
        <Widget
          class="bg-transparent"
          title="<h5>Detected<span class='fw-semi-bold'>&nbsp;Alerts</span></h5>"
          customHeader
        >
          <AlertsTable />
        </Widget>
      </b-col>
    </b-row>
    <b-row>
            <b-col xl="4" xs="12">
        <Widget
          title="<h6> Queries </h6>"
          close customHeader
        >
          <QueryTable />
          <p>test</p>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Neo4J from './components/Neo4J/Neo4J';
import Calendar from './components/Calendar/Calendar';
import AreaChart from './components/AreaChart/AreaChart';
import AnimatedNumber from "animated-number-vue";
//Added
import AlertsTable from './components/AlertsTable/AlertsTable';
import QueryTable from './components/QueryTable/QueryTable';
import UploadFile from './components/UploadFile/UploadFile';
//end of added

export default {
  name: 'Home',
  components: {
    Widget, Neo4J, Calendar, AreaChart, AnimatedNumber, AlertsTable, QueryTable,UploadFile //Added AlertsTable & QueryTable
  },
  data() {
    return {
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      checkedArr: [false, false, false],
      dataCollection: null,
    };
  },
  methods: {
    checkTable(id) {
      let arr = [];
      if (id === 0) {
        const val = !this.checkedArr[0];
        for (let i = 0; i < this.checkedArr.length; i += 1) {
          arr[i] = val;
        }
      } else {
        arr = this.checkedArr;
        arr[id] = !arr[id];
      }
      if (arr[0]) {
        let count = 1;
        for (let i = 1; i < arr.length; i += 1) {
          if (arr[i]) {
            count += 1;
          }
        }
        if (count !== arr.length) {
          arr[0] = !arr[0];
        }
      }
      Vue.set(this, 'checkedArr', arr);
    },
    fillData () {
      this.dataCollection = {
        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#1870DC',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            backgroundColor: '#F45722',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  mounted () {
    this.fillData();
  },
};
</script>

<style src="./Home.scss" lang="scss" />

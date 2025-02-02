////////////////////////////////
//
//   Copyright 2021 Battelle Energy Alliance, LLC
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////
import { Component, OnInit, Input } from '@angular/core';
import { EDMBarChartModel } from '../edm-bar-chart.model';
import { MaturityService } from '../../../services/maturity.service';


@Component({
  selector: 'edm-appendix-a-1',
  templateUrl: './edm-appendix-a-1.component.html',
  styleUrls: ['../../reports.scss']
})
export class EDMAppendixASectionOne implements OnInit {

  @Input() framework_data: any;
  append_a_data: any;

  constructor(
    private maturitySvc: MaturityService,
  ) {

  }

  ngOnInit(): void {
    this.maturitySvc.getMatDetailEDMAppendixList().subscribe(
      (success) => {
        this.append_a_data = success;
      },
      (failure) => {
        console.log(failure)
      }
    )
  }

  getTripleChartData(func) {
    let retVal = new EDMBarChartModel()
    retVal.title = `${func['FunctionName'].toUpperCase()} Summary`
    retVal.green = func['Totals']['Y']
    retVal.yellow = func['Totals']['I']
    retVal.red = func['Totals']['N']
    return retVal
  }

  getHorizontalChartData(cat) {
    let retVal = new EDMBarChartModel()
    retVal.green = cat['Totals']['Y']
    retVal.yellow = cat['Totals']['I']
    retVal.red = cat['Totals']['N']
    return retVal
  }

  getHorizontalChartDataForCategoryLevel(cat) {
    let retVal = new EDMBarChartModel();
    retVal.green = retVal.yellow = retVal.red = 0;
    if (cat.AnsweredEDM) {
      cat.AnsweredEDM.forEach(ans => {
        switch (ans.AnswerText) {
          case 'Y':
            retVal.green = retVal.green + 1;
            break;
          case 'I':
            retVal.yellow = retVal.yellow + 1;
            break;
          case 'N':
            retVal.red = retVal.red + 1;
            break;
        }
      });

    }
    return retVal;
  }

  getFrameworkColor(input) {
    let color = "rgb(0,0,0)"
    switch (input) {
      case 'ID': {
        color = "rgb(75,103,176)";
        break;
      }
      case 'PR': {
        color = "rgb(125,37,125)";
        break;
      }
      case 'DE': {
        color = "rgb(225,203,0)";
        break;
      }
      case 'RS': {
        color = "rgb(237,34,36)";
        break;
      }
      case 'RC': {
        color = "rgb(73,128,59)";
        break;
      }
    }
    let retVal = {
      'background-color': `${color}`
    }
    return retVal;
  }


}

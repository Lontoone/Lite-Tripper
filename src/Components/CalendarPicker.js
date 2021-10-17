import { makeStyles } from "@material-ui/core";
import React from "react";
import "../Components/Css/CalendarPicker.css";
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export class CalendarPicker extends React.Component {
  state = {
    selectedDate: 99,
    duration: 2,
    trs: [],
    endDate: new Date(),
  };

  constructor(props) {
    super(props);
    this.state = this.props;

    this.handleMonthButton = this.handleMonthButton.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeselect = this.handleDeselect.bind(this);
    this.get_td_classes = this.get_td_classes.bind(this);
  }
  handleSelect(td) {

    if(this.state.readonly){return;}

    this.setState({ selectedDate: td.date });
    console.log(this.state.selectedDate);

    //一同選擇duraion天後的天數
    const endday = new Date(td.date);
    this.setState({
      endDate: endday.setDate(endday.getDate() + this.state.duration - 1),
    });

    if (this.state.onSelectCallback!=null) {
      this.state.onSelectCallback(td);
    }
  }
  handleDeselect(td) {
    this.setState({ selectedDate: 99 });
  }

  handleMonthButton(opt) {
    console.log(opt);
    if (this.state.month + opt > 11) {
    } else if (this.state.month + opt < 0) {
    }

    this.setState((old) => {
      if (this.state.month + opt > 11 || this.state.month + opt < 0) {
        return {
          month: (old.month + opt + 12) % 12,
          year: old.year + opt,
        };
      } else {
        return { month: clamp(old.month + opt, 0, 11) };
      }
    });
  }

  //分辨_td className
  get_td_classes(_td) {
    //可互動
    var result = "cp__date-td";
    if (_td?.clickable) {
      //目前選擇 (單日)      
      if (this.state.duration == 1 && this.state.selectedDate?.getTime() == _td.date.getTime()) {
        result += " cp_selected";
      }
      //目前選擇 (多日)
      else if (
        _td.date >= this.state.selectedDate &&
        _td.date <= this.state.endDate
      ) {
        const startDate = new Date(this.state.selectedDate);
        //const endDate = new Date(this.state.selectedDate).setDate(startDate.getDate() + this.state.duration - 1);
        const endDate = this.state.endDate;

        if (_td.date.getTime() === startDate.getTime()) {
          result += " cp__selectStart";
        } else if (_td.date.getTime() === endDate) {
          result += " cp__selectEnd";
        } else if (_td.date < endDate && _td.date > startDate) {
          result += " cp__included";
        }
      }
      //預設
      else {
      }
    }
    //不可互動
    else {
      result += " cp__passedDate";
    }
    return result;
  }
  
  render() {
    var today = new Date();
    const currentMonth = this.state.month;
    const currentYear = this.state.year;

    console.log(today,currentMonth, currentYear);

    const weeks_th = ["一", "二", "三", "四", "五", "六", "日"];
    const months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    function showCalendar(month, year, avaliable_week) {
      let firstDay = new Date(year, month).getDay();
      let daysInMonth = 32 - new Date(year, month, 32).getDate();

      let date = 1;
      var _trs = [];

      for (let i = 0; i < 6; i++) {
        //let row = document.createElement("tr");
        _trs.push({});

        var _tds = [];
        for (let j = 0; j < 7; j++) {
          const _tdDate = new Date(currentYear, currentMonth, date);
          if (i === 0 && j < firstDay) {
            //空白格
            _tds.push({ clickable: false, text: "", date: _tdDate });
          } else if (date > daysInMonth) {
            break;
          } else {
            //_tbs.push(date);

            //判斷時間是否已經過了:過期就不會有選取效果
            if (
              _tdDate.getTime()<=today.getTime()||
              (month == today.getMonth() &&
                year == today.getFullYear() &&
                date < today.getDate()) //||$.inArray(j.toString(), avaliable_week) == -1 //賣家自訂義非販賣時間
            ) {
              //cell.classList.add("notClickableDate");
              console.log(year + " " + month+" "+today.getFullYear() +" "+today.getMonth());
              _tds.push({
                clickable: false,
                selected: false,
                text: date,
                date: _tdDate,
              });
            }
            //正常可選日期
            else {
              _tds.push({
                clickable: true,
                selected: false,
                text: date,
                date: _tdDate,
              });
            }

            date++;
          }
          _trs[i] = _tds;
        }
        //tbl.appendChild(row);
      }

      //this.setState({ trs: _trs });
      return _trs;
    }

    var table = showCalendar(this.state.month, this.state.year);

    return (
      <div className="cp__root">
        <div className="monthTitleContainer">
          <button
            className="monthButton"
            onClick={() => {
              this.handleMonthButton(-1);
            }}
          >
            {" "}
            {"<"}{" "}
          </button>
          <p>{this.state.year}</p>
          <p>{months[this.state.month]}</p>
          <button
            className="monthButton"
            onClick={() => {
              this.handleMonthButton(1);
            }}
          >
            {" "}
            {">"}{" "}
          </button>
        </div>
        <table className="cp__table">
          <tbody>
            <tr className="cp__header-tr">
              {weeks_th.map((_th) => {
                return <th className="cp__header">{_th}</th>;
              })}
            </tr>
            {table.map((_tr) => {
              if (!Array.isArray(_tr)) {
                return;
              }
              return (
                <tr className="cp__tr">
                  {_tr.map((_td, i) => {
                    //可互動
                    if (_td?.clickable) {
                      return (
                        <td
                          className={this.get_td_classes(_td)}
                          onClick={() => this.handleSelect(_td)}
                        >
                          {_td.text}
                        </td>
                      );
                    } else if (_td.selected) {
                      return (
                        <td
                          className="cp_selected"
                          onClick={() => this.handleDeselect(_td)}
                        >
                          {_td.text}
                        </td>
                      );
                    }
                    //不可互動
                    else {
                      return <td className="cp__passedDate">{_td.text}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

CalendarPicker.defaultProps = {
  readonly:false,
  duration: 1,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  onSelectCallback: {},
};
export default CalendarPicker;

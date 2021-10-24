import React from "react";
import "../Components/Css/CalendarPicker.css";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export class ReadonlyCalendar extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props;

    console.log(this.state.datas);

    this.handleMonthButton = this.handleMonthButton.bind(this);
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
    if (_td?.date >= new Date()) {
      for (var i = 0; i < this.state.datas.length; i++) {
        var selected = this.state.datas[i].startDate;
        var duration = this.state.datas[i].duration;
        var startDate = new Date(selected);
        var endDateTime = startDate.setDate(startDate.getDate() + parseInt( duration) - 1);
        var endDate = new Date(endDateTime);

        //目前選擇 (單日)
        if (duration == 1 && selected?.getTime() == _td.date.getTime()) {
          result += " cp_selected";
          return result;
        }

        //目前選擇 (多日)
        else if (_td.date >= selected && _td.date <= endDate) {
          if (_td.date.getTime() === selected.getTime()) {
            console.log(" cp__selectStart");
            result += " cp__selectStart";
          } else if (_td.date.getTime() === endDate.getTime()) {
            console.log(" cp__selectEnd");
            result += " cp__selectEnd";
          } else if (_td.date < endDate && _td.date > selected) {
            console.log(" cp__included");
            result += " cp__included";
          }

          //console.log(_td.date +" "+ endDate);
          //console.log(_td.date < endDate && _td.date > selected);
        }
        //預設
        else {
        }
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
        _trs.push({});

        var _tds = [];
        for (let j = 0; j < 7; j++) {
          const _tdDate = new Date(currentYear, currentMonth, date);
          if (i === 0 && j < firstDay) {
            //空白格
            _tds.push({ clickable: false, text: "", date: "" });
          } else if (date > daysInMonth) {
            break;
          } else {
            //判斷時間是否已經過了:過期就不會有選取效果
            if (
              _tdDate.getTime() <= today.getTime() ||
              (month == today.getMonth() &&
                year == today.getFullYear() &&
                date < today.getDate()) //||$.inArray(j.toString(), avaliable_week) == -1 //賣家自訂義非販賣時間
            ) {
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
      }

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
                    return (
                      <td className={this.get_td_classes(_td)}>{_td.text}</td>
                    );
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

ReadonlyCalendar.defaultProps = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  datas: [{ startDate: new Date(), duration: 2 }],
};

export default ReadonlyCalendar;

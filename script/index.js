var dataArr;
const testdumy = {
    "2022":[
        {
        "sid":"3318",
        "grade":"2",
        "wa":"수학",
        "ws":"수학과제탐구",
        "ta":"과학",
        "ts":"생명과학Ⅰ",
        "progress":2.7
        },
        {
            "sid":"3318",
            "grade":"2",
            "wa":"수학",
            "ws":"수학과제탐구",
            "ta":"과학",
            "ts":"생명과학Ⅰ",
            "progress":2.7
            },
            {
                "sid":"3318",
                "grade":"2",
                "wa":"수학",
                "ws":"수학과제탐구",
                "ta":"과학",
                "ts":"생명과학Ⅰ",
                "progress":2.7
                }
    ],
    "2023":[
        {
        "sid":"3318",
        "grade":"2",
        "wa":"수학",
        "ws":"수학과제탐구",
        "ta":"과학",
        "ts":"생명과학Ⅰ",
        "progress":2.7
        }
    ]        
}



function onselectyear() {
    $('#dep optgroup').remove();
    $('#subject option.1').remove();
    $('.listview').empty();

    let year = $("#year option:checked").val();
    let validSub = dataArr[0][year];

    let dom = '';
    $.each(validSub, (index, value) => {
        dom += `<optgroup label= "${index}학년">`;
        $.each(value, (i, _) => {
            dom += `<option value= "${year}/${index}/${i}">${i}</option>`;
        });
        dom += '</optgroup>';
    });
    console.log(dom);
    $('#dep').append(dom);
}

function onselectdep(){
    $('#subject option.1').remove();
    $('.listview').empty();

    let dep =$("#dep option:checked").val().split('/');
    let validSub = dataArr[0][dep[0]][dep[1]][dep[2]];

    let dom = '';
    $.each(validSub, (_, value)=>{
        dom += `<option class="1" value= "${dep.join('/')}/${value}">${value}</option>`;
    });
    console.log(dom);
    $('#subject').append(dom);
}

function search(){
    $('.listview').empty();
    let dat = $("#subject option:checked").val();
    if(dat == "n") return;
    console.log(dat);
    dat = dat.split('/');

    //request data
    $.post("http://40.82.159.60:8080/getList",{},(res, status)=> {
        let validSub = [];
        res = res[dat[0]];
        for(i in res){
            if(res[i].ws == dat[3]) validSub.push(res[i]);
        }
        let dom = '';
        if(validSub == []){
            dom = `<div class="list""><div class="item" id=":(">슬프게도 해당 과목에 대한 요청이 없습니다.</div></div>`
            $('.listview').append(dom);
        }
       for(i in validSub){
           i = validSub[i];
           dom = `<div class="list" id="${i.sid}/${i.ws}/${i.ts}" onclick= "listclickevent(this)"><div class="item" id="reg">${i.ws}</div><div class="item" id="hop">${i.ts}</div><div class="item" id="id">${i.sid}</div></div>`
           $('.listview').append(dom);
       }
    });
}




function listclickevent(dom){
    try {
        navigator.clipboard.writeText(dom.id);
        alert('클립보드에 복사되었습니다.');
    } catch (e) {
        alert('Failed to copy: ', e);
    }
}
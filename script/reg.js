var dataArr;
let selected1=0;
let selected2=0;

let regSub;
let hopSub;

function onselectyear() {
    $('.selectbox').empty();
    selected1 = 0;
    selected2 = 0;

    let select = document.getElementById("year");
    let year = select.options[select.selectedIndex].value;
    let validSub = dataArr[0][year];

    let dom = '';
    $.each(validSub, (index, value) => {
        dom += `<div class="secGrad"><b>${index}학년</b></div>`;
        $.each(value, (i, v) => {
            dom += `<div class="secTitle"><b>${i}</b></div>`;
            $.each(v, (_, vv) => {
                dom += `<div class="secItem" id= "${index}/${i}/${vv}" onclick= "onselectsub1(this)">${vv}</div>`;
            });
        });
    });
    $('#inner-con1').append(dom);
    $('#inner-con2').append(dom.replace(/onselectsub1/g,"onselectsub2"));
}


function onselectsub1(dom) {
    regSub = dom.id.split('/');
    if(!!hopSub && regSub[0] != hopSub[0]){
        alert("같은 학년에 속하는 과목만 선택가능합니다.");
        return;
    }
    if(!selected1) selected1 = !selected1;
    else if(selected1) $('#inner-con1 .secItem').css("background-color","");
    
    $(dom).css("background-color","silver");
}
function onselectsub2(dom) {
    hopSub = dom.id.split('/');
    if(!!regSub && regSub[0] != hopSub[0]){
        alert("같은 학년에 속하는 과목만 선택가능합니다.");
        return;
    }
    
    if(!selected2) selected2 = !selected2;
    else if(selected2) $('#inner-con2 .secItem').css("background-color","");
    
    $(dom).css("background-color","silver");
}

function register() {
    console.log('did it')
    let gr = $("#grade option:checked").val();
    console.log(gr)
    let cl = $("#class option:checked").val();
    let nm = $("#number option:checked").val();
    let res = gr+cl+nm;
    if(res.includes('n')){
        alert('먼저 학반번호를 선택해주세요');
        return;
    }
    console.log(res)
    //request

    alert('등록되었습니다.')
}
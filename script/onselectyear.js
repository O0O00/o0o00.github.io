function onselectyear() {
    $('#dep optgroup').remove();
    $('#subject option.1').remove();
    $('.listview').empty();

    let select = document.getElementById("year");
    let year = select.options[select.selectedIndex].value;
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

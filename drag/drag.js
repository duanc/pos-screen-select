export const DragBoxJs = {
    drag: function (divId, imgList, size, x, y, onChange,type,resDivList,showValue,showButtonValue) {
        dragBox()(divId, imgList, size, x, y, onChange,type,resDivList,showValue,showButtonValue)
    }
};

function dragBox() {

    var resDivList = []; // 结果list
    var sourceDivList = []; // 原list
    var resDataList = [];
    var endDocument;


     function getResDataList() {
        return resDivList.filter((item) => {
            return item.itemData;
        }).map((item) => {
            return {
                id: item.itemData,
                name: item.name,
                x:item.x,
                y:item.y
            }
        })
    }

    return function(divId, imgList, size, x, y,onChange,type, list,showValue,showButtonValue) {
        resDivList = [];
        sourceDivList = [];
        resDataList = list;
        var div = document.getElementById(divId);
        var left=document.createElement('div');
        var right= document.createElement('div');
        var showPos=document.createElement('div');
        var showButton=document.createElement('div');

        var showDiv=document.createElement('span');
        showDiv.id='showDiv';
        showDiv.style.position='fixed';
        showDiv.style.backgroundColor = 'white';
        showDiv.style.border='1px solid black';
        showDiv.style.display='none';

        showPos.innerHTML=showValue;
        showPos.style.backgroundColor='#343A40';
        showPos.style.color='#ffffff';
        showPos.style.padding='0 0 0 10px';
        showPos.style.height= '35px';
        showPos.style.lineHeight='35px';
        showPos.style.marginRight='5px';
        showPos.style.marginLeft='30px'

        showButton.innerHTML=showButtonValue;
        showButton.style.backgroundColor='#343A40';
        showButton.style.color='#ffffff';
        showButton.style.padding='0 0 0 10px';
        showButton.style.height= '35px';
        showButton.style.lineHeight='35px';

        div.innerHTML = "";

        var leftDiv = document.createElement('div');
        leftDiv.style.width = (size + 2) * x + "px";
        leftDiv.style.float = "left";
        for (var i = 0; i < x * y; i++) {
            // var divBoxFather=document.createElement('div');
            let divBox1 = document.createElement('div');
            divBox1.style.width = size + "px";
            divBox1.style.whiteSpace="normal";
            divBox1.style.textOverflow='ellipsis';
            divBox1.style.overflow="hidden";
            divBox1.style.wordBreak=' word-break';
            divBox1.style.height = size + "px";
            divBox1.style.border = "1px solid #dfdfdf";
            divBox1.style.float = "left";
            divBox1.style.lineHeight=size+'px';
            divBox1.style.textAlign='center';
            divBox1.draggable = true;
            divBox1.y = Math.floor(i / x);
            divBox1.x = i - x * Math.floor(i / x);
            divBox1.index = i;
            divBox1.isRes = true;
            resDataList.forEach((item)=>{
                if(item.x===(i - x * Math.floor(i / x)) && item.y===(Math.floor(i / x))&&item.id){
                    divBox1.itemData = item ? item.id : undefined;
                    divBox1.title=item.name;
                    if(type===0){
                        divBox1.style.background = "url(" + item.url + ") no-repeat";
                        divBox1.style.backgroundSize = "cover";
                        // divBox1.addEventListener('mouseover',function (event) {
                        //     event.preventDefault();
                        //     var show = document.getElementById('showDiv');
                        //     show.style.display ='block';
                        //     show.style.top=event.clientY;
                        //     show.style.left=event.clientX;
                        //     show.innerHTML=event.target.title;
                        // })
                        // divBox1.addEventListener('mouseout',function (event) {
                        //     event.preventDefault();
                        //     var show = document.getElementById('showDiv');
                        //     show.style.block='none';
                        // })
                    } else {
                        divBox1.innerHTML=item.name;
                        divBox1.style.textAlign='center';
                        divBox1.style.lineHeight=size + "px";
                    }
                }
            })

            divBox1.addEventListener("dragenter", function (event) {
                event.preventDefault();
                // console.log('left移动',endDocument);
                endDocument = event.target;

            },false);
            divBox1.addEventListener("dragover", function (event) {
                event.preventDefault();
            },false);
            divBox1.addEventListener("dragend", function (event) {
                event.preventDefault();
                // console.log('left移动结束');
                // console.log('endDocument.isRes',endDocument);
                // console.log('event.target.isRes',event.target.parentElement);


                if (endDocument.isRes && event.target.isRes) {

                    var tempBackground;
                    var title;
                    var tempItemData = endDocument.itemData;
                    if(type==0){
                        tempBackground=endDocument.style.background;
                        title=endDocument.title;
                        endDocument.style.background = event.target.style.background;
                        endDocument.title=event.target.title;
                        event.target.style.background = tempBackground;
                        event.target.title=title;
                    }else{
                        tempBackground=endDocument.innerText;
                        endDocument.innerHTML= event.target.innerText;
                        event.target.innerHTML=tempBackground;
                    }

                    endDocument.itemData = event.target.itemData;
                    event.target.itemData = tempItemData;
                    onChange(getResDataList());
                }

                if (!endDocument.isRes && event.target.isRes) {
                    // console.log('2')
                    for (let k = 0; k < sourceDivList.length; k++) {
                        if (event.target.itemData == sourceDivList[k].itemData) {
                            enableDiv(sourceDivList[k]);
                        }
                    }
                    event.target.itemData = undefined;
                    event.target.style.background = "none";
                    event.target.title='';
                    event.target.innerHTML='',
                    event.innerHTML=null;
                    onChange(getResDataList());
                }
            },false);
            // divBoxFather.appendChild(divBox);
            resDivList.push(divBox1);
            leftDiv.appendChild(divBox1);
        }
        left.appendChild(showPos);
        left.appendChild(leftDiv);

        div.appendChild(left);

        var rightDiv = document.createElement('div');
        rightDiv.style.width = (size + 2) * x + "px";
        rightDiv.style.float = "left";
        rightDiv.style.marginLeft = "30px";
        sourceDivList = [];
        for (var j = 0; j < x * y; j++) {
            var imgItem = imgList[j];
            // var divBoxFather=document.createElement('div');
            let divBox = document.createElement('div');
            divBox.style.width = size + "px";
            divBox.style.whiteSpace="nowrap";
            divBox.style.textOverflow='ellipsis';
            divBox.style.overflow="hidden";
            divBox.style.wordBreak=' word-break';
            divBox.style.height = size + "px";
            divBox.style.border = "1px solid #dfdfdf";
            divBox.style.float = "left";
            divBox.itemData = imgItem ? imgItem.id : undefined;
            divBox.style.lineHeight=size+'px';
            divBox.style.textAlign='center';
            divBox.enable = true;
            divBox.isRes = false;
            divBox.draggable = true;
            if (imgItem != undefined) {
                divBox.title=imgItem.name;
                if(type===0){
                    divBox.style.position='relative';
                    divBox.style.background = "url("+imgItem.url+") no-repeat";
                    // divBox.title=imgItem.name;
                    // divBox.appendChild(divName);
                   /* divBox.addEventListener('mouseover',function (event) {
                        event.preventDefault();
                        var show = document.getElementById('showDiv');
                        console.log('show', show);
                        show.style.position='absolute';
                        show.style.top=event.clientY;
                        show.style.left=event.clientX;
                        show.style.display ='block';
                        show.innerHTML=event.target.title;
                    })
                    divBox.addEventListener('mouseout',function (event) {
                        event.preventDefault();
                        var show = document.getElementById('showDiv');
                        show.style.block='none';
                    }) */
                }else{
                    divBox.innerHTML=imgItem.name;
                    // divBox.style.textAlign='center';
                    // divBox.style.lineHeight=size + "px";
                }


            }
            divBox.style.backgroundSize = "cover";




            // 拖动是
            divBox.addEventListener("dragenter", function (event) {
                event.preventDefault();
                endDocument = event.target;
            },false);
            divBox.addEventListener("dragover", function (event) {
                event.preventDefault();
            },false);
            // 拖动完成
            divBox.addEventListener("dragend", function (event) {
                console.log('right移动')
                event.preventDefault();
                event.stopPropagation();

                if (!endDocument.isRes && !event.target.isRes) {
                    return;
                }

                if (!event.target.enable) {
                    return;
                }


                // console.log(event);

                if (endDocument.itemData) {
                    // console.log(endDocument.itemData);
                    for (let k = 0; k < sourceDivList.length; k++) {
                        // console.log(sourceDivList[k].itemData);
                        if (endDocument.itemData == sourceDivList[k].itemData) {
                            enableDiv(sourceDivList[k]);
                        }
                    }
                }


                //如果源列表拖往结果列表则清除后添加
                for (let k = 0; k < resDivList.length; k++) {
                    //
                    if (resDivList[k].itemData && event.target.itemData == resDivList[k].itemData) {
                        // console.log(resDivList[k]);
                        resDivList[k].itemData = undefined;
                        resDivList[k].style.background = "none";
                    }
                }

                endDocument.itemData = event.target.itemData;
                if(type===1){
                    endDocument.innerHTML=event.target.innerText;
                    // endDocument.style.textAlign='center';
                    // endDocument.style.lineHeight=size + "px";
                }else{
                    endDocument.style.background = event.target.style.background;
                    endDocument.title=event.target.title;
                    endDocument.style.backgroundSize = "cover";
                }

                onChange(getResDataList());
                disableDiv(event.target);
            },false);
            // divBoxFather.appendChild(divBox)
            sourceDivList.push(divBox);
            rightDiv.appendChild(divBox);
        }
        right.appendChild(showButton);
        right.appendChild(rightDiv);
        div.appendChild(right);

        // div.append(showDiv);

        for (let k = 0; k < sourceDivList.length; k++) {
            resDataList.forEach((item)=>{
                if(item.id===sourceDivList[k].itemData){
                    disableDiv(sourceDivList[k]);
                }
            })
        }
        onChange(getResDataList());

    };


    function disableDiv(div) {
        div.enable = false;
        div.draggable = false;
        div.style.filter = "grayscale(100%)"
        div.style.opacity='0.3'
    }

    function enableDiv(div) {
        div.enable = true;
        div.draggable = true;
        div.style.filter = "grayscale(0%)"
        div.style.opacity='1'
    }
}


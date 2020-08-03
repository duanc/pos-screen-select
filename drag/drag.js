export const DragBoxJs = {
    drag: function (divId, imgList, size, x, y, onChange,type,resDivList) {
        dragBox()(divId, imgList, size, x, y, onChange,type,resDivList)
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

    return function(divId, imgList, size, x, y,onChange,type, list) {
        resDivList = [];
        sourceDivList = [];
        resDataList = list;

        var div = document.getElementById(divId);
        div.innerHTML = "";
        // resDivList = [];
        // div.style.width =  (size+2)*x*2+30 +"px";
        var leftDiv = document.createElement('div');
        leftDiv.style.width = (size + 2) * x + "px";
        leftDiv.style.float = "left";
        for (var i = 0; i < x * y; i++) {
            var divBox = document.createElement('div');
            divBox.style.width = size + "px";
            divBox.style.height = size + "px";
            divBox.style.border = "1px solid #dfdfdf";
            divBox.style.float = "left";
            divBox.style.lineHeight=size+'px';
            divBox.style.textAlign='center';
            divBox.draggable = true;
            divBox.y = Math.floor(i / x);
            divBox.x = i - x * Math.floor(i / x);
            divBox.index = i;
            divBox.isRes = true;
            resDataList.forEach((item)=>{
                if(item.x===(i - x * Math.floor(i / x)) && item.y===(Math.floor(i / x))&&item.id){
                    divBox.itemData = item ? item.id : undefined;
                    if(type===0){
                        divBox.style.background = "url(" + item.name + ") no-repeat";
                        divBox.style.backgroundSize = "cover";
                    } else {
                        divBox.innerHTML=item.name;
                        divBox.style.textAlign='center';
                        divBox.style.lineHeight=size + "px";
                    }
                }
            })
            divBox.addEventListener("dragenter", function (event) {
                event.preventDefault();
                // console.log('left移动',endDocument);
                endDocument = event.target;

            });

            divBox.addEventListener("dragend", function (event) {
                event.preventDefault();
                console.log('left移动结束');
                // console.log('endDocument.isRes',endDocument);
                // console.log('event.target.isRes',event.target);


                if (endDocument.isRes && event.target.isRes) {
                    var tempBackground;
                    var tempItemData = endDocument.itemData;
                    if(type==0){
                        tempBackground=endDocument.style.background;
                        endDocument.style.background = event.target.style.background;
                        event.target.style.background = tempBackground;
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
                    for (let k = 0; k < sourceDivList.length; k++) {
                        if (event.target.itemData == sourceDivList[k].itemData) {
                            enableDiv(sourceDivList[k]);
                        }
                    }
                    event.target.itemData = undefined;
                    event.target.style.background = "none";
                    event.target.innerHTML='',
                    event.innerHTML=null;
                    onChange(getResDataList());
                }
            });


            resDivList.push(divBox);
            leftDiv.appendChild(divBox);
        }
        div.appendChild(leftDiv);

        var rightDiv = document.createElement('div');
        rightDiv.style.width = (size + 2) * x + "px";
        rightDiv.style.float = "left";
        rightDiv.style.marginLeft = "30px";
        sourceDivList = [];
        for (var j = 0; j < x * y; j++) {
            var imgItem = imgList[j];
            var divBox = document.createElement('div');
            divBox.style.width = size + "px";
            divBox.style.height = size + "px";
            divBox.style.border = "1px solid #dfdfdf";
            divBox.style.float = "left";
            divBox.itemData = imgItem ? imgItem.id : undefined;
            divBox.style.lineHeight=size+'px';
            divBox.style.textAlign='center';
            divBox.enable = true;
            divBox.isRes = false;
            divBox.draggable = true;
            // let enable= true;
            /*imgList.forEach((itemList)=>{
                resDataList.forEach((resItem)=>{

                    if(resItem.id===itemList.id){
                        // console.log(resItem.id,itemList.id);
                        disableDiv(divBox);
                    }
                })
            })*/

            if (imgItem != undefined) {
                if(type===0){
                    divBox.style.background = "url(" + imgItem.name + ") no-repeat";
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
                // console.log(endDocument);
            });
            // 拖动完成
            divBox.addEventListener("dragend", function (event) {
                console.log('right移动')
                event.preventDefault();

                if (!endDocument.isRes && !event.target.isRes) {
                    return;
                }

                if (!event.target.enable) {
                    return;
                }


                // console.log(event);

                if (endDocument.itemData) {
                    console.log(endDocument.itemData);
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
                    endDocument.style.backgroundSize = "cover";
                }

                onChange(getResDataList());
                disableDiv(event.target);
            });

            rightDiv.appendChild(divBox);
            sourceDivList.push(divBox);
        }

        div.appendChild(rightDiv);

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


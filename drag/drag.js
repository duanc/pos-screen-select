export const DragBoxJs = {
    drag: function (divId,imgList, x, y) {
        initView(divId, imgList,x, y)
    }
};

var imgList = [];
var resDivList = [];
var sourceDivList = [];
var resDataList = [];
var endDocument;

function initView(divId, imgList,x, y) {
    this.imgList = imgList;
    var size = 100;
    var div = document.getElementById(divId);
    resDivList = [];
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
        divBox.draggable = true;
        divBox.index = i;
        divBox.isRes = true;
        divBox.addEventListener("dragenter", function (event) {
            event.preventDefault();
            endDocument = event.target;
            console.log(endDocument);
        });

        divBox.addEventListener("dragend", function (event) {
            event.preventDefault();
            console.log(event);

            if (endDocument.isRes && event.target.isRes) {
                var tempBackground = endDocument.style.background;
                var tempItemData = event.target.itemData;
                endDocument.style.background = event.target.style.background;
                endDocument.itemData = event.target.itemData;
                event.target.style.background = tempBackground;
                event.target.itemData = tempItemData;
            }

            if (!endDocument.isRes && event.target.isRes) {
                for (let k = 0; k < sourceDivList.length; k++) {
                    if (event.target.itemData == sourceDivList[k].itemData) {
                        enableDiv(sourceDivList[k]);
                    }
                }
                event.target.itemData = undefined;
                event.target.style.background = "none";
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
        divBox.enable=true;
        divBox.isRes = false;
        if (imgItem != undefined) {
            divBox.style.background = "url(" + imgItem.src + ") no-repeat";
            divBox.draggable = true;
        }
        divBox.style.backgroundSize = "cover";


        divBox.addEventListener("dragenter", function (event) {
            event.preventDefault();
            endDocument = event.target;
            console.log(endDocument);
        });
        divBox.addEventListener("dragend", function (event) {
            event.preventDefault();

            if (!endDocument.isRes && !event.target.isRes) {
                return;
            }

            if (!event.target.enable) {
                return;
            }


            console.log(event);
            //如果源列表拖往结果列表则清除后添加
            for (let k = 0; k < resDivList.length; k++) {
                //
                if (resDivList[k].itemData && event.target.itemData == resDivList[k].itemData) {
                    console.log(resDivList[k]);
                    resDivList[k].itemData = undefined;
                    resDivList[k].style.background = "none";
                }
            }
            endDocument.style.background = event.target.style.background;
            endDocument.style.backgroundSize = "cover";
            endDocument.itemData = event.target.itemData;

            disableDiv(event.target);

        });
        rightDiv.appendChild(divBox);
        sourceDivList.push(divBox);

    }
    div.appendChild(rightDiv);

}


function disableDiv(div) {
    div.enable = false;
    div.draggable = false;
    div.style.filter = "grayscale(100%)"
}

function enableDiv(div) {
    div.enable = true;
    div.draggable = true;
    div.style.filter = "grayscale(0%)"
}

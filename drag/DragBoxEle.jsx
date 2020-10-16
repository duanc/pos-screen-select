import React, {Component} from 'react';

import {DragBoxJs} from './drag';
import img20101 from './theme/default/20101.png';
import img20102 from './theme/default/20102.png';
import img20103 from './theme/default/20103.png';
import img20104 from './theme/default/20104.png';
import img20105 from './theme/default/20105.png';
import img20106 from './theme/default/20106.png';
import img20107 from './theme/default/20107.png';
import img20108 from './theme/default/20108.png';
import img20109 from './theme/default/20109.png';
import img20110 from './theme/default/20110.png';
import img20111 from './theme/default/20111.png';
import img20112 from './theme/default/20112.png';
import img20113 from './theme/default/20113.png';
import img20114 from './theme/default/20114.png';
import img20115 from './theme/default/20115.png';


export default class DragBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: new Date().getTime(),
        };
        this.rsNum = -1;
    }

    componentDidMount() {
        console.log('componentDidMount',this.props);
        const {xSize, ySize, size, onChange,type,sourceDivList,resDivList,showValue,showButton} = this.props;
        // console.log('resDivList', resDivList);
        // console.log('sourceDivList', sourceDivList);
        // console.log('xSize', xSize);
        // console.log('ySize', ySize);
        this.initView(size, xSize, ySize,onChange,type,sourceDivList,resDivList,showValue,showButton);
    }


    initView = (size, xSize, ySize,onChange,type,sourceDivList,resDivList,showValue,showButton) => {
        const {id} = this.state;
        // console.log('initView',resDivList);

       /* const imageList = [{
            id: "20101",
            src: img20101,
        }, {
            id: "20102",
            src: img20102,
        }, {
            id: "20103",
            src: img20103,
        }, {
            id: "20104",
            src: img20104,
        }, {
            id: "20105",
            src: img20105,
        }, {
            id: "20106",
            src: img20106,
        }, {
            id: "20107",
            src: img20107,
        }, {
            id: "20108",
            src: img20108,
        }, {
            id: "20109",
            src: img20109,
        }, {
            id: "20110",
            src: img20110,
        }, {
            id: "20111",
            src: img20111,
        }, {
            id: "20112",
            src: img20112,
        }, {
            id: "20113",
            src: img20113,
        }, {
            id: "20114",
            src: img20114,
        }, {
            id: "20115",
            src: img20115,
        }];
*/
        DragBoxJs.drag(id, sourceDivList, size, xSize, ySize,onChange,type,resDivList,showValue,showButton);
    };


    componentWillReceiveProps(nextProps) {
        // const {xSize, ySize, size, onChange,type,sourceDivList,resDivList} = this.props;
        // console.log('resDivList', resDivList,xSize,ySize);
        // this.initView(size, xSize, ySize,onChange,type,sourceDivList,resDivList);
        // const {xSize, ySize, size,onChange} = nextProps;
        // this.initView(size, xSize, ySize,onChange);
    }

    // changWindow = (props) => {
    //     if (props.debug) {
    //         console.log(props);
    //         console.log(this.rsNum);
    //     }
    //
    //     if (props.visible && this.rsNum === -1) {
    //         const {id} = this.state;
    //         let content = $('#' + id);
    //         if (props.type === 2) {
    //             const {children} = this.state;
    //             content = children;
    //         }
    //         const rs = layer.open({
    //             shade: props.shade || 0,
    //             type: props.type || 1,
    //             title: props.title,
    //             maxmin: true,
    //             anim:3,
    //             area: [props.width || '800px', props.height || '500px'],
    //             zIndex: layer.zIndex,
    //             success: function (layero) {
    //                 layer.setTop(layero);
    //             },
    //             content,
    //             cancel: (index) => {
    //                 if (props.onCancel) {
    //                     props.onCancel(index);
    //                 }
    //                 return false;
    //             }
    //         });
    //         this.rsNum = rs;
    //     }
    //
    //     if (!props.visible && this.rsNum !== -1) {
    //         layer.close(this.rsNum);
    //         this.rsNum = -1;
    //     }
    // };

    render() {
        const {children, id} = this.state;
        return (
            <div id={id} style={{overflow: "hidden", display: "flex", "justify-content": "center"}}>
                {children}
            </div>
        );
    }
}

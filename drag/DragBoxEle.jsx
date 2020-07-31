import React, {Component} from 'react';

import {DragBoxJs} from './drag';
import img20101 from './theme/default/20101.png';
import img20102 from './theme/default/20102.png';
import img20103 from './theme/default/20103.png';
import img20104 from './theme/default/20104.png';
import img20105 from './theme/default/20105.png';

export default class DragBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: new Date().getTime(),
            children: props.children,
        };
        this.rsNum = -1;
    }

    componentDidMount() {
        const {id} = this.state;
        const imageList = [{
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
            src: "./theme/default/20104.png",
        }, {
            id: "20105",
            src: "./theme/default/20105.png",
        }, {
            id: "20106",
            src: "./theme/default/20106.png",
        }, {
            id: "20107",
            src: "./theme/default/20107.png",
        }, {
            id: "20108",
            src: "./theme/default/20108.png",
        }, {
            id: "20109",
            src: "./theme/default/20109.png",
        }, {
            id: "20110",
            src: "./theme/default/20110.png",
        }, {
            id: "20111",
            src: "./theme/default/20111.png",
        }, {
            id: "20112",
            src: "./theme/default/20112.png",
        }, {
            id: "20113",
            src: "./theme/default/20113.png",
        }, {
            id: "20114",
            src: "./theme/default/20114.png",
        }, {
            id: "20115",
            src: "./theme/default/20115.png",
        }];
        DragBoxJs.drag(id,imageList,3,8);
    }


    componentWillReceiveProps(nextProps) {

        this.setState({
            children: nextProps.children,
        }, () => {
            this.changWindow(nextProps);
        });
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
            <div id={id} style={{'display': 'none'}}>
                {children}
            </div>
        );
    }
}

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
        const {xSize, ySize, size, onChange,type,sourceDivList,resDivList,showValue,showButton,onClick} = this.props;
        this.initView(size, xSize, ySize,onChange,type,sourceDivList,resDivList,showValue,showButton,onClick);
    }


    initView = (size, xSize, ySize,onChange,type,sourceDivList,resDivList,showValue,showButton, onClick) => {
        const {id} = this.state;
        DragBoxJs.drag(id, sourceDivList, size, xSize, ySize,onChange,type,resDivList,showValue,showButton, onClick);
    };


    componentWillReceiveProps(nextProps) {
        // const {xSize, ySize, size, onChange,type,sourceDivList,resDivList} = this.props;
        // console.log('resDivList', resDivList,xSize,ySize);
        // this.initView(size, xSize, ySize,onChange,type,sourceDivList,resDivList);
        // const {xSize, ySize, size,onChange} = nextProps;
        // this.initView(size, xSize, ySize,onChange);
    }



    render() {
        const {children, id} = this.state;
        return (
            <div id={id} style={{overflow: "hidden", display: "flex", "justify-content": "center"}}>
                {children}
            </div>
        );
    }
}

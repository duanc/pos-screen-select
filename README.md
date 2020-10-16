# pos-screen-select
```html
 	<DragBox
            xSize={xSize}
            ySize={10}
            size={80}
            type={0/1}
            //0 表示图片 1表示文字
            onChange={(data)=>{
              console.log(data);
              this.setState({
                data
              });
            }}
          />
```

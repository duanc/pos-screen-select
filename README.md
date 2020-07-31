# pos-screen-select
```html
 	<DragBox
            xSize={xSize}
            ySize={10}
            size={80}
            onChange={(data)=>{
              console.log(data);
              this.setState({
                data
              });
            }}
          />
```
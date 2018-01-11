# vt-infinitescroll [demo](https://vue-tools.github.io/vt-infinitescroll/#/readme)

基于 vue 2 封装出的 button 组件，提供了基本的样式和事件。

## Install

```javascript
npm i vt-infinitescroll -S

import InfiniteScroll from 'vt-infinitescroll'

// global install
Vue.component('InfiniteScroll', InfiniteScroll)

// scope install
export default {
    components: {
        InfiniteScroll
    }
}
```

## Usage

```example
<style>
.demo{
    width: 750px;
    max-height: 300px;
    overflow-y: auto;
}
</style>
<template>
    <div class="demo">
        <InfiniteScroll @next="next" distance="5" :end="end">
            <Cell arrow v-for="item in list">
                <p slot="content">{{item.content}}</p>
            </Cell> 
        </InfiniteScroll>
    </div>
</template>

<script>
    import InfiniteScroll from 'vt-infinitescroll'
    import Cell from 'vt-cell'
    
    function createList(n, start = 0) {
        let result = []
        while(n--) {
            result[n] = {
                content: '内容' + (n + start)
            }
        }
        return result
    }

    export default {
        data: function() {
            return {
                list: createList(10),
                page: 1
            }
        },
        computed: {
            end() {
                return this.page === 4
            }  
        },
        methods: {
            next(){
                setTimeout(() => {
                    this.list = this.list.concat(createList(10, this.page * 10))
                    this.page++
                }, 1000)
            }
        },
        components: {
            InfiniteScroll,
            Cell
        }
    }
</script>
```

## Interface

```interface
props:
  text:
    type: String
    default: ''
    description: 加载完成后的文字提示
  distance:
    type: Number
    default: 30
    description: 距离滚动到底部的距离
  end:
    type: Boolean
    default: false
    description: 结束的条件，通常异步回调成功之后和这个属性关联，具体可查看example
    
```
   

## TODO

- [ ] add tests 
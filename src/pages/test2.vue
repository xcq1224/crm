<template>
    <div class="page">
       <baidu-map ref="map" class="map" :center="center" :zoom="zoom" :min-zoom="3" :max-zoom="20" @load="getLocation">
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" class="right-control" style="top: 40px;left: 20px;">
                <!-- <span @click="getLocation">定位</span> -->
                <div class="boxContent vux-1px"  @click="addMarker">
                    <img src="/static/amap/point.png">
                    <span>打点</span>
                </div>
                <div class="boxContent vux-1px"  @click="newPolyline">
                    <img src="/static/amap/line.png">
                    <span>连线</span>
                </div>
                <div class="boxContent vux-1px"  @click="addMarker">
                    <img src="/static/amap/save.png">
                    <span>保存</span>
                </div>
            </bm-control>
            <bm-control class="cross" style="top: 40px;left: 20px;">
                <img src="/static/amap/cross.png"/>
            </bm-control>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation="true" @locationSuccess="locationSuccess" @locationError="locationError"></bm-geolocation>
            <bm-polyline @click="polylineClick" :path="path" v-for="path in polyline.paths"></bm-polyline>
            <bm-marker @click="markerClick(markerPoint)" v-for="(markerPoint, index) in markerPointList" :key="index" :icon="{url: '/static/amap/point.png', size: {width: 32, height: 32}}" :position="markerPoint" :dragging="true"></bm-marker>
        </baidu-map>
        <div class="btns" v-show="polyline.editing">
            <div class="confirm" @click="handleLineConfirm">确 定</div>
            <div class="cancel" @click="handleLineCancel">取 消</div>
        </div>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    export default {
        components: {
            XButton,
        },
        data () {
            return {
                center: {
                    lng: 116.404, 
                    lat: 39.915
                },
                zoom: 16,
                polyline: {
                    editing: false,
                    paths: []
                },
                // markerPoint: [{
                //     lat: 39.935584,
                //     lng: 116.405078
                // },{
                //     lat: 39.92651,
                //     lng: 116.399329
                // }],
                markerPointList: [],
            }
        },
        activated(){

        },
        methods: {
            getLocation(){
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition((r) =>{    
                    // console.log(r) 
                    // r.point.lng -= 0.008774687519
                    // r.point.lat -= 0.00374531687912
                    this.center = r.point
                },{enableHighAccuracy: true})
            },
            //  添加点
            addMarker(){
                let point = this.$refs.map.map.getCenter()
                this.markerPointList.push(point)
            },
            //  点击点
            markerClick(point){
                if(this.polyline.editing){
                    //  连线
                    let paths = this.deepClone(this.polyline.paths)
                    console.log(paths)
                    paths[paths.length - 1].push(point)
                    this.polyline.paths = paths
                }else{
                    //  设置点信息
                }
            },
            //  点击线
            polylineClick(){
                console.log(3421)
            },
            locationSuccess(){
            },
            locationError(){
            },
            newPolyline (e) {
                if(this.polyline.editing) return
                this.polyline.editing = true
                this.polyline.paths.push([])
                // this.polyline.editing = !this.polyline.editing
                // if (this.polyline.editing) {
                //     this.polyline.paths.push([])
                //     console.log(this.polyline)
                //     return
                // }
                // let paths = this.deepClone(this.polyline.paths)
                // const path = paths[paths.length - 1]
                // if (path.length < 2) {
                //     paths.pop()
                // }
                // this.polyline.paths = paths
                // console.log(this.polyline)
            },

        /************连线**************** */
            //  确定连线
            handleLineConfirm(){
                this.polyline.editing = false
                let paths = this.deepClone(this.polyline.paths)
                const path = paths[paths.length - 1]
                if (path.length < 2) {
                    paths.pop()
                }
                this.polyline.paths = paths
                console.log(this.polyline)
            },
            //  取消连线
            handleLineCancel(){
                this.polyline.editing = false
                let paths = this.deepClone(this.polyline.paths)
                paths.pop()
                this.polyline.paths = paths
            },
        }
    }
</script>
<style lang="less">
    .page .map{
        height: 100%;
        overflow: hidden;
    }
    .BMap_cpyCtrl, .anchorBL{
        display: none;
    }
    .cross{
        width: 32px;
        height: 32px;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        margin: auto;
        img{
            display: block;
        }
    }
    .right-control{
        top: 200px !important;
        bottom: auto !important;
        .boxContent {
            // position: absolute;
            // right: 6px;
            // top: 232px;
            width: 40px;
            height: 40px;
            background: #fff;
            color: #777;
            margin-bottom: 8px;
            margin-right: 8px;
            img {
                width: 24px;
                height: 24px;
                display: block;
                margin: 0 auto;
            }

            span {
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                text-align: center;
                font-size: 12px;
            }
        }
    }

    .btns {
        position: absolute;
        left: 94px;
        bottom: 26px;
        display: flex;
        justify-content: space-between;
        width: 50%;

        div {
            width: 76px;
            height: 24px;
            color: rgba(26, 188, 156, 1);
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(26, 188, 156, 1);
            text-align: center;
            border-radius: 6px;
        }

        .confirm {
        }
    }
</style>
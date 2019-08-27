<template>
    <div class="page">
       <baidu-map ref="map" class="map" :center="center" :zoom="zoom" :min-zoom="3" :max-zoom="20">
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-control class="abc" style="top: 40px;left: 20px;">
                <button @click="newPolyline">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
                <span @click="getLocation">定位</span>
                <span @click="addMarker">打点</span>
            </bm-control>
            <bm-control class="cross" style="top: 40px;left: 20px;">
                <img src="/static/amap/cross.png"/>
            </bm-control>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation="true" @locationSuccess="locationSuccess" @locationError="locationError"></bm-geolocation>
            <bm-polyline :path="path" v-for="path in polyline.paths"></bm-polyline>
            <bm-marker @click="markerClick(markerPoint)" v-for="(markerPoint, index) in markerPointList" :key="index" :icon="{url: '/static/amap/point.png', size: {width: 32, height: 32}}" :position="markerPoint" :dragging="true"></bm-marker>
        </baidu-map>
    </div>
</template>
<script>
    export default {
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
            this.getLocation()
        },
        methods: {
            getLocation(){
                console.log(2241)
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition((r) =>{    
                    console.log(r) 
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
                    const {paths} = this.polyline
                    console.log(paths)
                    paths[paths.length - 1].push(point)
                    console.log(paths)
                }else{
                    //  设置点信息
                }
            },
            locationSuccess(){
            },
            locationError(){
            },
            newPolyline (e) {
                this.polyline.editing = !this.polyline.editing
                if (this.polyline.editing) {
                    this.polyline.paths.push([])
                    console.log(this.polyline)
                    return
                }
                let paths = this.polyline.paths
                const path = paths[paths.length - 1]
                if (path.length < 2) {
                    paths.pop()
                }
                console.log(this.polyline)
            },
        }
    }
</script>
<style lang="less">
    .page>div{
        height: 100%;
        overflow: hidden;
    }
    .BMap_cpyCtrl, .anchorBL{
        display: none;
    }
    .abc{
        top: 40px !important;
        left: 20px !important;
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
</style>
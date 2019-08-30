<template>
    <div class="page">
       <baidu-map ref="map" :dragging="false" class="map" :center="center" :zoom="zoom" :min-zoom="16" :max-zoom="20" @mousemove="syncPolyline" @click="paintPolyline" @rightclick="newPolyline">
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-control class="abc" style="top: 40px;left: 20px;">
                <button @click="polyline.editing = !polyline.editing">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
                <span @click="getLocation">定位</span>
                <span @click="addMarker">打点</span>
            </bm-control>
            <bm-control class="cross" style="top: 40px;left: 20px;">
                <img src="/static/amap/cross.png"/>
            </bm-control>
            <bm-info-window :position="{lng: 114.315571, lat: 30.59254}" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
                <p v-text="infoWindow.contents"></p>
                <span @click="clear">Clear</span>
            </bm-info-window>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation="true" @locationSuccess="locationSuccess" @locationError="locationError"></bm-geolocation>
            <!-- <bm-polyline @click="abcd" :path="path" v-for="(path, index) in polyline.paths" :strokeWeight="10" :clicking="true" :key="index"></bm-polyline> -->
            <bm-polyline ref="polyline" @click="abcd" :path="polyline.paths[0]" :strokeWeight="10" :clicking="true"></bm-polyline>
            <bm-marker @click="markerClick" v-for="(markerPoint, index) in markerPointList" :key="index" :icon="{url: '/static/amap/point.png', size: {width: 32, height: 32}}" :position="markerPoint" :dragging="true"></bm-marker>
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
                infoWindow: {
                    show: true,
                    contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                zoom: 16,
                polyline: {
                    editing: false,
                    paths: [[]
                        // [{lat: 30.59254,lng: 114.315571},
                        // {lat: 30.587722,lng: 114.315823},
                        // {lat: 30.587286,lng: 114.313703}]
                    ]
                },
                markerPointList: [],
            }
        },
        activated(){
            this.getLocation()
        },
        methods: {
            infoWindowClose (e) {
                this.infoWindow.show = false
            },
            infoWindowOpen (e) {
                this.infoWindow.show = true
            },
            clear () {
                console.log(353)
                this.infoWindow.show = false
                this.infoWindow.show = false
            },
            abcd(){
                console.log(8888)
                alert(222)
            },
            getLocation(){
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition((r) =>{    
                    this.center = r.point
                },{enableHighAccuracy: true})
            },
            //  添加点
            addMarker(){
                this.infoWindow.show = true
                let point = this.$refs.map.map.getCenter()
                this.markerPointList.push(point)

                var pois = [
                    new BMap.Point(114.315571,30.59254),
                    new BMap.Point(114.315823,30.587722),
                    new BMap.Point(114.313703,30.587286),
                ];
                var polyline =new BMap.Polyline(pois, {
                    enableEditing: false,//是否启用线编辑，默认为false
                    enableClicking: true,//是否响应点击事件，默认为true
                    strokeWeight:'20',//折线的宽度，以像素为单位
                    strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
                    strokeColor:"#18a45b" //折线颜色
                });
                polyline.addEventListener('touchstart', () => {
                    console.log(354353463)
                })
                polyline.addEventListener('touchend', () => {
                    console.log(546)
                })
                this.$refs.map.map.addOverlay(polyline)
            },
            //  点击点
            markerClick(){
                console.log(this.polyline)
                alert(111)
            },
            locationSuccess(){
            },
            locationError(){
            },
            syncPolyline (e) {
                if (!this.polyline.editing) {
                    return
                }
                const {paths} = this.polyline
                if (!paths.length) {
                    return
                }
                const path = paths[paths.length - 1]
                console.log(555)
                if (!path.length) {
                    console.log(4444)
                    return
                }
                if (path.length === 1) {
                    path.push(e.point)
                }
                this.$set(path, path.length - 1, e.point)
                console.log(this.polyline)
            },
            newPolyline (e) {
                console.log(222)
                if (!this.polyline.editing) {
                    return
                }
                const {paths} = this.polyline
                if(!paths.length) {
                    paths.push([])
                }
                const path = paths[paths.length - 1]
                path.pop()
                if (path.length) {
                    paths.push([])
                }
                console.log(this.polyline)
            },
            paintPolyline (e) {
                console.log(e.target)
                if (!this.polyline.editing) {
                    return
                }
                const {paths} = this.polyline
                !paths.length && paths.push([])
                paths[paths.length - 1].push(e.point)
                console.log(e.point)
                
            }
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
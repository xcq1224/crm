<template>
    <div class="page">
       <baidu-map ref="map" class="map" :center="center" :zoom="zoom" :min-zoom="3" :max-zoom="20" @mousemove="syncPolyline" @click="paintPolyline" @rightclick="newPolyline">
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-control class="abc" style="top: 40px;left: 20px;">
                <button @click="polyline.editing = !polyline.editing">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
                <span @click="getLocation">定位</span>
                <span @click="addMarker">打点</span>
            </bm-control>
            <bm-control class="cross" style="top: 40px;left: 20px;">
                <img src="/static/amap/cross.png"/>
            </bm-control>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation="true" @locationSuccess="locationSuccess" @locationError="locationError"></bm-geolocation>
            <bm-polyline :path="path" v-for="(path, index) in polyline.paths" :key="index"></bm-polyline>
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
                zoom: 16,
                polyline: {
                    editing: false,
                    paths: [
                        [{
                            lat: 23.117628,
                            lng: 114.408251
                        },{
                            lat: 23.116232,
                            lng: 114.404334
                        },{
                            lat: 23.11457,
                            lng: 114.408143
                        }],
                        [{
                            lat: 23.11353985,
                            lng: 114.41065808
                        },{
                            lat: 23.117628,
                            lng: 114.408251
                        }],
                    ]
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
            markerClick(){
                console.log(6666)
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
                console.log(333)
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
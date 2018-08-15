<template>
    <div class="container">
        <v-header></v-header>
        <v-banner></v-banner>
        <div class="content-step">
            <div class="title">领库API接口使用步骤</div>
            <div class="content-step-item">
                <ul>
                    <li>
                        <div class="num">1</div>
                        <div class="info">
                            <p>注册领库账号</p>
                            <p>并登录开放平台</p>
                        </div>
                    </li>
                    <li>
                        <div class="num">2</div>
                        <div class="info">
                            <p>在我的应用中创建应用</p>
                            <p>并获取appid和appkey</p>
                        </div>
                    </li>
                    <li>
                        <div class="num">3</div>
                        <div class="info">
                            <p>阅读API文档</p>
                            <p>并创建签名</p>
                        </div>
                    </li>
                    <li>
                        <div class="num">4</div>
                        <div class="info">
                            <p>查看示例和sdk</p>
                            <p>使用方法</p>
                        </div>
                    </li>
                    <li>
                        <div class="num">5</div>
                        <div class="info">
                            <p>在接口列表中</p>
                            <p>选择接口</p>
                        </div>
                    </li>
                    <li>
                        <div class="num">6</div>
                        <div class="info">
                            <p>实地操作编码</p>
                            <p>进行测试</p>
                        </div>
                    </li>
                    <li>
                        <div class="num">7</div>
                        <div class="info">
                            <p>正式接入领库</p>
                            <p>开放接口</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content-view">
            <div class="content-view-sdk">
                <div class="icon">
                    <img src="./assets/image_sdk.png" alt="">
                </div>
                <div class="info">
                    <h3>SDK工具</h3>
                    <p>GSDATA数据开放平台开放了包括微信、微博、APP以及平台系统等多种数据接口，提供丰富的数据内容。SDK开发工具简便的使用方式、多种版本大大提高用户开发效率</p>
                    <button type="button" class="ivu-btn ivu-btn-success">立即查看</button>
                </div>
            </div>
            <div class="content-view-api">
                <div class="info">
                    <h3>API接口</h3>
                    <p>GSDATA数据开放平台提供了两微一端数据接口，即微信、微博和APP数据，以便捷的合作模式和丰富的数据满足多领域数据需求。助力实现信息分享、大数据分析、数据报告等</p>
                    <button type="button" class="ivu-btn ivu-btn-success">立即查看</button>
                </div>
                <div class="icon">
                    <img src="./assets/image_api.png" alt="">
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>

import header from 'components/website/header/header';
import banner from 'components/website/banner/banner';
import footer from 'components/website/footer/footer';

export default {
    data() {
        return {
        }
    },
    components: {
        'v-header': header,
        'v-banner': banner,
        'v-footer': footer
    }
}
</script>

<style lang="scss">

    @import "../../../assets/css/common.scss";

    .content-step {
        background: #f7f7f7;
        padding: 60px 0;
        box-sizing: border-box;
        .title {
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: #333;
            text-align: center;
            font-weight: 600;
            margin-bottom: 20px;
        }
        ul {
            width: 1020px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
                text-align: center;
                color: #555;
                .num {
                    width: 32px;
                    height: 32px;
                    display: inline-block;
                    background: #43c0ff;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    line-height: 32px;
                    border-radius: 50%;
                    margin-bottom: 20px;
                }
                p {
                    margin-bottom: 4px;
                }
            }
        }
    }
    .content-view {
        width: 800px;
        margin: 0 auto;
        padding: 40px 0;
        background: #fff;
        &>div {
            display: flex;
            justify-content: space-between;
            .icon {
                width: 200px;
                img {
                    max-width: 100%;
                }
            }
            .info {
                width: 480px;
                h3 {
                    color: #444;
                    font-weight: 500;
                    margin-bottom: 12px;
                    font-size: 18px;
                }
                p {
                    line-height: 28px;
                    color: #666;
                }
                .ivu-btn {
                    margin-top: 18px;
                }
            }
        }
        &>div:nth-child(1) {
            margin-bottom: 60px;
        }
    }
</style>

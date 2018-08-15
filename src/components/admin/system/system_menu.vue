<template>
  <div class="container" ref="container">
    <Card dis-hover>
      <p slot="title"><Icon type="md-menu"></Icon> 菜单管理</p> 
      <Button slot="extra" type="info" size="small" @click.stop="addParent">添加主菜单</Button>
      <div class="menu-content">

        <div class="menu-list">
          <div class="menu-parent" @click.stop='slideEventParent'>
            <div class="parent-title"><Icon type="ios-folder" color="#1ab394"></Icon> 用户管理</div>
            <div class="tools-bar">
              <Button slot="extra" type="success" size="small" @click.stop="editParent">编辑</Button>
              <Button slot="extra" type="info" size="small" @click.stop="addChild">添加子菜单</Button></button>
              <Button slot="extra" type="error" size="small" @click.stop="delParent">删除</Button>
            </div>
          </div>
          <ul class="menu-child">
            <li class="child-item">
              <div class="item-title"><i class="fa fa-list-ul"></i>1212</div>
              <div class="tools-bar">
                <Button slot="extra" type="success" size="small" @click.stop="editChild">编辑</Button>
                <Button slot="extra" type="error" size="small" @click.stop="delChild">删除</Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Card>

    <!-- modal弹框 - 添加主菜单 -->
    <Modal
        v-model="models.addParent"
        title="添加主菜单"
        :mask-closable="false"
        width="640">
        <Form ref="addParent" :model="forms.addParent" :rules="rules" :label-width="100">
            <FormItem label="菜单名称" prop="keyname">
                <Input v-model="forms.addParent.keyname" placeholder="请输入菜单名称"></Input>
            </FormItem>
            <FormItem label="菜单icon" prop="icon">
                <Input v-model="forms.addParent.icon" placeholder="请输入菜单icon"></Input>
            </FormItem>
            <FormItem label="排序值" prop="order">
                <Input v-model="forms.addParent.order" placeholder="请输入排序值"></Input>
            </FormItem>
        </Form>
          <div slot="footer">
            <Button type="text" @click="addParentCancel">取消</Button>
            <Button type="primary" :loading="forms.addParent.loading"  @click="addParentSubmit">确认添加</Button>
        </div>
    </Modal>

    <!-- modal弹框 - 编辑主菜单 -->
    <Modal
        v-model="models.editParent"
        title="编辑主菜单"
        :mask-closable="false"
        width="640">
        <Form ref="editParent" :model="forms.editParent" :rules="rules" :label-width="100">
            <FormItem label="菜单名称" prop="keyname">
                <Input v-model="forms.editParent.keyname" placeholder="请输入菜单名称"></Input>
            </FormItem>
            <FormItem label="菜单icon" prop="icon">
                <Input v-model="forms.editParent.icon" placeholder="请输入菜单icon"></Input>
            </FormItem>
            <FormItem label="排序值" prop="order">
                <Input v-model="forms.editParent.order" placeholder="请输入排序值"></Input>
            </FormItem>
        </Form>
          <div slot="footer">
            <Button type="text" @click="editParentCancel">取消</Button>
            <Button type="primary" :loading="forms.editParent.loading"  @click="editParentSubmit">确认修改</Button>
        </div>
    </Modal>

    <!-- modal弹框 - 添加子菜单 -->
    <Modal
        v-model="models.addChild"
        title="添加子菜单"
        :mask-closable="false"
        width="640">
        <Form ref="addChild" :model="forms.addChild" :rules="rules" :label-width="100">
            <FormItem label="路由控制器" prop="act">
                <Input v-model="forms.addChild.act" placeholder="请输入路由控制器"></Input>
            </FormItem>
            <FormItem label="菜单icon" prop="keyname">
                <Input v-model="forms.addChild.keyname" placeholder="请输入菜单名称"></Input>
            </FormItem>
            <FormItem label="排序值" prop="url">
                <Input v-model="forms.addChild.url" placeholder="请输入菜单路由地址"></Input>
            </FormItem>
        </Form>
          <div slot="footer">
            <Button type="text" @click="addChildCancel">取消</Button>
            <Button type="primary" :loading="forms.addChild.loading"  @click="addChildSubmit">确认添加</Button>
        </div>
    </Modal>

     <!-- modal弹框 - 添加子菜单 -->
    <Modal
        v-model="models.editChild"
        title="编辑子菜单"
        :mask-closable="false"
        width="640">
        <Form ref="editChild" :model="forms.editChild" :rules="rules" :label-width="100">
            <FormItem label="菜单名称" prop="act">
                <Input v-model="forms.editChild.act" placeholder="请输入路由控制器"></Input>
            </FormItem>
            <FormItem label="菜单icon" prop="keyname">
                <Input v-model="forms.editChild.keyname" placeholder="请输入菜单名称"></Input>
            </FormItem>
            <FormItem label="排序值" prop="url">
                <Input v-model="forms.editChild.url" placeholder="请输入菜单路由地址"></Input>
            </FormItem>
        </Form>
          <div slot="footer">
            <Button type="text" @click="editChildCancel">取消</Button>
            <Button type="primary" :loading="forms.editChild.loading"  @click="editChildSubmit">确认修改</Button>
        </div>
    </Modal>
    
  </div>
</template>
<script>
import common from "assets/js/common";
import dataSearch from "components/admin/grid-components/dataSearch";
import dataGrid from "components/admin/grid-components/dataGrid";

export default {
  data() {
    return {
      rowIndex: "",
      models: {
        addParent: false,
        editParent: false,
        addChild: false,
        editChild: false
      },
      forms: {
        addParent: {
          keyname: "",
          icon: "",
          order: "",
          loading: false
        },
        editParent: {
          keyname: "",
          icon: "",
          order: "",
          loading: false
        },
        addChild: {
          keyname: "",
          icon: "",
          order: "",
          loading: false
        },
        editChild: {
          keyname: "",
          icon: "",
          order: "",
          loading: false
        }
      },
      rules: {
        keyname: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        icon: [
          { required: true, message: "菜单icon不能为空", trigger: "blur" }
        ],
        order: [{ required: true, message: "排序值不能为空", trigger: "blur" }],
        url: [
          { required: true, message: "菜单路由地址不能为空", trigger: "blur" }
        ],
        act: [
          { required: true, message: "路由控制器不能为空", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    // parent 主菜单相关事件
    addParent() {
      this.models.addParent = true;
      this.$refs.addParent.resetFields();
      this.forms.addParent.loading = false;
    },
    addParentSubmit() {
      this.$refs.addParent.validate(valid => {
        if (valid) {
          this.forms.addParent.loading = true;
          var parameter = {};
          parameter.keyname = this.forms.addParent.keyname;
          parameter.icon = this.forms.addParent.icon;
          parameter.order = this.forms.addParent.order;
          common.requestInterface({
            url: common.getApiUrl + "/auth/add",
            parameter: parameter,
            successFun: backData => {
              if (backData.status == 1) {
                this.$Message.success(backData.err);
                this.models.addParent = false;
                this.getApiListData();
              } else {
                this.$Message.error(backData.err);
              }
              this.forms.addParent.loading = false;
            }
          });
        }
      });
    },
    addParentCancel() {
      this.models.addParent = false;
    },
    editParent() {
      this.models.editParent = true;
      this.$refs.editParent.resetFields();
      this.forms.editParent.loading = false;
    },
    editParentSubmit() {
      this.$refs.editParent.validate(valid => {
        if (valid) {
          this.forms.editParent.loading = true;
          var parameter = {};
          parameter.keyname = this.forms.editParent.keyname;
          parameter.icon = this.forms.editParent.icon;
          parameter.order = this.forms.editParent.order;
          common.requestInterface({
            url: common.getApiUrl + "/api/add",
            parameter: parameter,
            successFun: backData => {
              if (backData.status == 1) {
                this.$Message.success(backData.err);
                this.models.editParent = false;
                this.getApiListData();
              } else {
                this.$Message.error(backData.err);
              }
              this.forms.editParent.loading = false;
            }
          });
        }
      });
    },
    editParentCancel() {
      this.models.editParent = false;
    },
    delParent() {
      var model = this.$Modal.confirm({
        title: "确认提示",
        content: "您确定要删除此条数据吗",
        loading: true,
        closable: true,
        width: "340px",
        closable: true,
        onOk: () => {
          var parameter = {};
          parameter.id = this.rowIndex.id;
          common.requestInterface({
            url: common.getApiUrl + "/api/delete",
            parameter: parameter,
            successFun: backData => {
              if (backData.status == 1) {
                this.$Message.success("操作成功");
                this.$Modal.remove(model);
                this.getApiListData();
              } else {
                this.$Message.error(backData.err);
                this.$Modal.remove(model);
              }
            }
          });
        }
      });
    },

    // child 子菜单相关事件
    addChild() {
      this.models.addChild = true;
      this.$refs.addChild.resetFields();
      this.forms.addChild.loading = false;
    },
    addChildSubmit() {
      this.$refs.addChild.validate(valid => {
        if (valid) {
          this.forms.addChild.loading = true;
          var parameter = {};
          parameter.keyname = this.forms.addChild.keyname;
          parameter.icon = this.forms.addChild.icon;
          parameter.order = this.forms.addChild.order;
          common.requestInterface({
            url: common.getApiUrl + "/api/add",
            parameter: parameter,
            successFun: backData => {
              if (backData.status == 1) {
                this.$Message.success(backData.err);
                this.models.addChild = false;
                this.getApiListData();
              } else {
                this.$Message.error(backData.err);
              }
              this.forms.addChild.loading = false;
            }
          });
        }
      });
    },
    addChildCancel() {
      this.models.addChild = false;
    },

    editChild() {
      this.models.editChild = true;
      this.$refs.editChild.resetFields();
      this.forms.editChild.loading = false;
    },
    editChildSubmit() {
      this.$refs.editChild.validate(valid => {
        if (valid) {
          this.forms.editChild.loading = true;
          var parameter = {};
          parameter.keyname = this.forms.editChild.keyname;
          parameter.icon = this.forms.editChild.icon;
          parameter.order = this.forms.editChild.order;
          common.requestInterface({
            url: common.getApiUrl + "/api/add",
            parameter: parameter,
            successFun: backData => {
              if (backData.status == 1) {
                this.$Message.success(backData.err);
                this.models.editChild = false;
                this.getApiListData();
              } else {
                this.$Message.error(backData.err);
              }
              this.forms.editChild.loading = false;
            }
          });
        }
      });
    },
    editChildCancel() {
      this.models.editChild = false;
    },
    delChild() {
      var model = this.$Modal.confirm({
        title: "确认提示",
        content: "您确定要删除此条数据吗",
        loading: true,
        closable: true,
        width: "340px",
        closable: true,
        onOk: () => {
          var parameter = {};
          parameter.id = this.rowIndex.id;
          common.requestInterface({
            url: common.getApiUrl + "/api/delete",
            parameter: parameter,
            successFun: backData => {
              if (backData.status == 1) {
                this.$Message.success("操作成功");
                this.$Modal.remove(model);
                this.getApiListData();
              } else {
                this.$Message.error(backData.err);
                this.$Modal.remove(model);
              }
            }
          });
        }
      });
    },
    slideEventParent() {
      console.log()
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.container {
  height: 100%;
  background: #fff;
}
.menu-content {
  margin: 0 auto;

  .menu-parent {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    padding: 0 25px;
    background: #f2f2f2;
    color: #555;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .parent-title {
      display: flex;
      align-items: center;
      i {
        margin-right: 8px;
      }
    }
  }

  .menu-child {
    .child-item {
      height: 60px;
      line-height: 60px;
      padding: 0 25px 0 45px;
      color: #666;
      border-bottom: 1px dashed #ccc;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-title {
        display: flex;
        align-items: center;
        i {
          margin-right: 8px;
          color: #1ab394;
        }
      }
      &:hover {
        background: #fbfbfb;
      }
    }
  }
}
.ivu-card {
  border-bottom: none;
  .ivu-card-head {
    padding: 8px 16px;
    p {
      font-size: 12px;
      color: #555;
      display: flex;
      align-items: center;
    }
    .ivu-icon {
      margin-right: 5px;
      font-size: 14px;
    }
  }
  .ivu-card-body {
    padding: 0;
  }
  .ivu-card-extra {
    top: 7px;
    button {
      margin-left: 8px;
    }
  }
}

.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
// reset弹框表格
.ivu-modal-wrap {
  width: 100%;
  height: 100%;
}

.ivu-modal {
  max-height: 100%;
  overflow: auto;
}

.ivu-modal-confirm-body {
  font-size: 14px;
}
</style>

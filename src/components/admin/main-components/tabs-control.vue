<template>
    <div style="display:inline-block;padding:0 4px;">
        <Dropdown trigger="click" transfer @on-click="handleTagsOption">
            <Tooltip content="选项卡操作" placement="bottom">
            <a href="javascript:void(0)">
                <Icon :style="{marginTop: '-2px', marginRight: '3px', verticalAlign: 'middle'}" color="#495060" :size="20" type="md-close-circle"></Icon>
                <Icon type="arrow-down-b"></Icon>
            </a>
            </Tooltip>
            <DropdownMenu slot="list">
                <DropdownItem>定位当前选项卡</DropdownItem>
                <DropdownItem divided name="clearAll">关闭全部选项卡</DropdownItem>
                <DropdownItem name="clearOthers">关闭其他选项卡</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
export default {
    name: 'tabsControl',
    data () {
        return {
        };
    },
    methods: {
        handleTagsOption (type) {
            if (type === 'clearAll') {
                this.$store.commit('clearAllTags');
                this.$router.push({
                    name: 'home_index'
                });
            } else if(type === 'clearOthers') {
                this.$store.commit('clearOtherTags', this);
            }
        },
    }
};
</script>

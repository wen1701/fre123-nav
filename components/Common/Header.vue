<template>
	<div class="w-full bg-white sticky top-0 z-[110]">
		<div
			id="LinksSurf-header"
			class="header-transition m-auto flex border-b-2 border-b-gray-50 md:px-[20px] py-[10px]"
		>
			<div class="relative flex items-center justify-center md:basis-1/3">
				<a :href="baseInfo['web_host']" target="_blank">
					<img class="header-logo header-transition" :src="baseInfo['logo']" alt="" />
				</a>
				<a
					:href="baseInfo['web_host']"
					target="_blank"
					class="header-text header-transition ml-[20px] leading-[80px] md:text-[32px] text-[#333]"
				>
					{{ baseInfo['app_name'] }}
				</a>
			</div>

			<div
				v-show="showSearch"
				class="items-center justify-center flex-grow hidden cursor-pointer md:flex"
			>
				<IndexSearch> </IndexSearch>
			</div>
			<div class="items-center justify-end hidden cursor-pointer md:flex basis-1/3">
				<div v-if="headerConfig.right.is_show" class="relative flex justify-end flex-grow">
					<div
						class="px-3 flex items-center justify-end header-transition md:text-[16px] text-[#333333] p-2"
						@mouseover="showCategory(true)"
						@mouseout="showCategory(false)"
					>
						<a
							v-if="headerConfig.right?.group?.name"
							:href="headerConfig.right?.group?.url"
							target="_blank"
							class="px-3 bg-opacity-50 cursor-pointer transition-bg-hover-200"
							>{{ headerConfig.right?.group?.name }}</a
						>
						<div
							v-if="
								headerConfig.right?.group?.children &&
								headerConfig.right?.group?.children.length > 0
							"
							class="absolute transition-all text-[16px] bottom-[-120px] bg-white rounded-md shadow-lg"
							:class="`${isShow ? ' opacity-100' : 'opacity-0'}`"
						>
							<ul class="">
								<li
									v-for="item in headerConfig.right?.group?.children"
									class="px-3 cursor-pointer transition-bg-hover-200"
								>
									<a :href="item.url" target="_blank">{{ item.name }}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CONFIG_KEY_BASE, CONFIG_KEY_HERDER, getConfigItem } from '~/stores/config'
const baseInfo = getConfigItem(CONFIG_KEY_BASE)
const headerConfig = getConfigItem(CONFIG_KEY_HERDER)

withDefaults(
	defineProps<{
		isIndex: boolean
		showSearch?: boolean
		headerText?: string
	}>(),
	{
		showSearch: false,
	},
)

// 控制头部变化
const headerAnimation = (action: string) => {
	const headerDom = document.getElementById('LinksSurf-header')
	const searchDom = document.getElementById('resource-menu')
	if (headerDom) {
		if (action == 'smaller') {
			headerDom.classList.add('custom-size')
			searchDom?.classList.add('hidden')
		} else {
			headerDom.classList.remove('custom-size')
			searchDom?.classList.remove('hidden')
		}
	}
}

const isShow = ref(false)
const showCategory = (show: boolean) => {
	isShow.value = show
}

defineExpose({ headerAnimation })
</script>

<style scoped>
#LinksSurf-header {
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
}
.header-transition {
	transition: all 0.3s ease-in-out;
}

.header-logo {
	width: 80px;
	height: 80px;
	padding: 10px;
}

.header-logo:hover {
	transform: rotate(360deg);
}

/* 头部固定类 */
.custom-size {
	padding-top: 0px;
	padding-bottom: 0px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-size img {
	width: 60px;
	height: 60px;
}

.custom-size .header-text {
	height: 60px;
	line-height: 60px;
	font-size: 22px;
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '../stores/auth'
import { useUserStore } from '../stores/user'
import { validators } from '../utils/validators'
import { service } from '../services/login'
import { Icon } from '@iconify/vue'

const router = useRouter()
const auth = useAuthStore()
const user = useUserStore()
const formRef = ref<FormInstance>()
const form = reactive({
	username: '',
	password: '',
})

const remeber = ref()

const rules = reactive<FormRules>({
	username: validators.required('用户名'),
	password: validators.required('密码'),
})

const login = async (formEl: FormInstance | undefined) => {
	await formEl?.validate((valid, fields) => {
		if (valid) {
			service
				.login(form)
				.then((res: any) => {
					user.setUser(res.data)
					auth.login()
					console.log(res.data)
					ElNotification({
						title: '登录成功',
						type: 'success',
					})
					router.push('/dashboard')
				})
				.catch((err: any) => {
					ElNotification({
						title: '登录失败',
						message: err.response.data,
						type: 'error',
					})
				})
		} else {
			// TODO:
		}
	})
}
</script>
<template>
	<div class="flex w-full h-full">
		<div class="flex w-[60%] h-full justify-center items-center">
			<div>
				<img class="w-400px" src="@/assets/img/login-box-bg.svg" />
				<div class="text-20px text-bold text-center">运维中心</div>
			</div>
		</div>
		<div class="flex w-[40%] h-full justify-center items-center">
			<el-card class="w-[80%] max-w-500px">
				<div class="text-center m-20px">
					<h2 class="text-2xl">登 录</h2>
				</div>
				<el-form class="p-10px" label-position="top" :model="form" :rules="rules" ref="formRef">
					<el-form-item label="用户名" class="my-10px" prop="username">
						<el-input placeholder="请输入用户名" v-model="form.username" clearable />
					</el-form-item>
					<el-form-item label="密码" class="my-10px" prop="password">
						<el-input placeholder="请输入密码" v-model="form.password" clearable show-password />
					</el-form-item>
					<div class="w-full my-10px flex justify-between">
						<el-checkbox v-model="remeber" label="记住我" />
						<el-link type="primary" :underline="false">忘记密码</el-link>
					</div>
					<div class="w-full my-10px">
						<el-button class="w-full" type="primary" @click="login(formRef)">登录</el-button>
					</div>
					<div class="w-full my-10px">
						<el-button class="my-10px w-full" @click="router.push('/register')">注册</el-button>
					</div>
					<el-divider>
						<span class="text-base font-normal">其他登录方式</span>
					</el-divider>
					<div class="w-full px-30px py-10px flex justify-between">
						<Icon class="cursor-pointer" icon="ant-design:github-filled" height="40px" color="#999" />
						<Icon class="cursor-pointer" icon="ant-design:qq-circle-filled" height="40px" color="#999" />
						<Icon class="cursor-pointer" icon="ant-design:wechat-filled" height="40px" color="#999" />
						<Icon class="cursor-pointer" icon="ant-design:alipay-circle-filled" height="40px" color="#999" />
					</div>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<style scoped>
.iconify:hover {
	color: var(--el-color-primary) !important;
}
</style>

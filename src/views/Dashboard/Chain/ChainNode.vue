<script setup lang="ts">
import moment from 'moment'
import { ref, reactive } from 'vue'
import { validators } from '@/utils/validators'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules, Action } from 'element-plus'
import { chain_service } from '@/services/chain'
import { chain } from 'lodash'
import { NodeStatus } from '@/types' 

const route = useRoute()
const router = useRouter()

const pageSize = 10
const total = ref(0)
let currentPage = 1
let userList: any[]
let nodeList: NodeStatus[]
let nodeListRef = ref(Array())
let showList = ref(Array())
const addUserDialogVisible = ref(false)

const init = () => {
	userList = [
		{
			username: 'admin',
			password: 'admin',
			permissions: ['权限A', '权限B'],
			createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
		},
	]

	total.value = userList.length
	showList.value = userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	chain_service.get_chainstatus()
		.then((res: any) => {
			nodeList = res.data
			for(let i = 0; i < nodeList.length; ++i) {
				nodeList[i].createTime = moment(nodeList[i].createTime).format('YYYY-MM-DD HH:mm:ss')
			}
			nodeListRef.value = nodeList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
		})
}

init()

const handleCurrentChange = (value: number) => {
	currentPage = value
	// showList.value = userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	nodeListRef.value = nodeList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}

const indexMethod = (index: number) => {
	return (currentPage - 1) * pageSize + index + 1
}

const formRef = ref<FormInstance>()
const form = reactive({
	username: '',
	password1: '',
	password2: '',
	permissions: Array(),
})
const rules = reactive<FormRules>({
	username: [validators.required('用户名'), validators.notEmpty('用户名')],
	password1: [validators.required('密码'), validators.lengthRange(6, 20, '密码'), validators.notEmpty('密码')],
	password2: [
		validators.required(''),
		{
			validator: (rule: any, value: string, callback: any) => {
				if (form.password1 !== form.password2) {
					callback('两次输入的密码不一致')
				}
			},
		},
	],
})

const submit = async (formEl: FormInstance | undefined) => {
	await formEl?.validate((valid, fields) => {
		if (valid) {
			// TODO:
		} else {
			// TODO:
		}
	})
}

const handleClose = (done: () => void) => {
	formRef.value?.resetFields()
	done()
}

</script>
<template>
	<div class="w-full p-20px">
		<el-card class="w-full">
			<template #header>
				<h2 class="text-2xl">节点管理</h2>
			</template>

			<el-table :data="nodeListRef" highlight-current-row border>
				<el-table-column label="No." type="index" :index="indexMethod" width="100" />
				<el-table-column label="节点名称" prop="nodeName" />
				<el-table-column label="节点类型" prop="nodeType"/>
				<el-table-column label="所属组织" prop="creator" />
				<el-table-column label="ip" prop="ip" />
				<el-table-column label="创建时间" prop="createTime" />
			</el-table>

			<div class="w-full mt-20px flex items-center justify-center">
				<el-pagination
					layout="jumper, prev, pager, next,total"
					:total="total"
					:page-size="pageSize"
					@current-change="handleCurrentChange"
				/>
			</div>

			<el-button class="w-full mt-20px" plain @click="addUserDialogVisible = true">
				<el-icon><Plus /></el-icon>
				&nbsp新增区块链节点
			</el-button>
		</el-card>
	</div>

	<el-dialog v-model="addUserDialogVisible" title="新增节点" :before-close="handleClose" width="40%">
		<el-form ref="formRef" :model="form" :rules="rules" label-position="top" id="form">
			<el-row :gutter="60">
				<el-col>
					<el-form-item label="用户名" prop="username">
						<el-input placeholder="请输入用户名" v-model="form.username" />
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="60">
				<el-col>
					<el-form-item label="密码" prop="password1">
						<el-input placeholder="请输入密码" v-model="form.password1" show-password />
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="60">
				<el-col>
					<el-form-item label="确认密码" prop="password2">
						<el-input placeholder="请确认密码" v-model="form.password2" show-password />
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="60">
				<el-col>
					<el-form-item label="节点权限" prop="permissions">
						<el-checkbox-group v-model="form.permissions" size="large">
							<el-checkbox label="权限一" />
							<el-checkbox label="权限二" />
							<el-checkbox label="权限三" />
							<el-checkbox label="权限四" />
							<el-checkbox label="权限五" />
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="60">
				<el-col :span="6" :offset="3">
					<el-button class="w-full" type="success" @click="submit(formRef)">确认</el-button>
				</el-col>

				<el-col :span="6">
					<el-button class="w-full" type="primary" @click="formRef?.resetFields()">重置</el-button>
				</el-col>

				<el-col :span="6">
					<el-button class="w-full" type="danger" @click="addUserDialogVisible = false">返回</el-button>
				</el-col>
			</el-row>
		</el-form>
	</el-dialog>
</template>
<style lang="less" scoped>
#form {
	:deep(.el-form-item__label) {
		font-size: 1rem;
	}
}
</style>

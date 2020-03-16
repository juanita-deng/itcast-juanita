<template>
	<div class="hm-input">
		<input
			:type="type"
			:placeholder="placeholder"
			:value="value"
			@input="inputFn"
			:class="{
				success: status === 'success',
				error: status === 'error'
			}"
		/>
		<div class="tips" v-show="status === 'error'">{{ message }}</div>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: '请输入'
		},
		type: {
			type: String,
			default: 'text'
		},
		value: String,
		rule: RegExp,
		message: String
	},
	data() {
		return {
			status: ''
		};
	},
	methods: {
		inputFn(e) {
			// console.log(e.target.value);
			const value = e.target.value;
			this.$emit('input', value);
			this.validate(value);
		},
		validate(value) {
			//表单校验
			if (this.rule) {
				if (this.rule.test(value)) {
					this.status = 'success';
					return true;
				} else {
					this.status = 'error';
					return false;
				}
				console.log(this.status);
			}
		}
	}
};
</script>

<style lang="less" scoped>
.hm-input {
	margin: 0 30px;
	height: 50px;
	input {
		border: none;
		width: 100%;
		outline: none;
		border-bottom: 2px solid #cccccc;
		font-size: 16px;
		&.success {
			border-color: green;
		}
		&.error {
			border-color: red;
		}
	}
	.tips {
		color: red;
	}
}
</style>

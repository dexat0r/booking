<template>
    <div class="form-wrap">
        <div class="form">
            <div class="form-title">
                {{ options[currentType].title }}
            </div>
            <div class="form-body">
                <template v-for="item in options[currentType].body">
                    <div class="form-row">
                        <label class="form-label">{{ item.label }}</label>
                        <input
                            v-if="typeof(item.inputType) == 'string'"
                            :type="item.inputType"
                            class="form-input"
                            v-model="data[item.model]"
                        />
                        <select v-else class="form-input" v-model="data[item.model]">
                            <option v-for="option in item.inputType" :value="option.value" :disabled="option?.disabled" :selected="option?.selected"> {{ option.option }} </option>
                        </select>
                    </div>
                </template>
            </div>
            <div class="form-footer">
                <a
                    :href="options[currentType].footer?.link"
                    class="footer-link"
                    @click="setType($event, options[currentType].footer.btnTypeSet)"
                    >{{ options[currentType].footer?.linkText }}</a
                >
                <Button
                    class="footer-btn"
                    >{{ options[currentType].footer?.btn }}</Button
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import { ref } from "vue";

type Type = "login" | "register";

type Body = {
    label: string;
    inputType: string | Select[];
    model: string;
};

type Footer = {
    link: string;
    btn: string;
    linkText: string;
    btnTypeSet: Type;
};

type Select = {
    option: string,
    value: string,
    selected?: boolean,
    disabled?: boolean
}

interface Props {
    type: Type;
}

type FormOptions = {
    [key in Type]: {
        title: string;
        body: Body[];
        footer?: Footer;
    };
};
const props = defineProps<Props>();

const currentType = ref(props.type);

const options: FormOptions = {
    login: {
        title: "Вход",
        body: [
            {
                label: "Логин",
                inputType: "text",
                model: "login",
            },
            {
                label: "Пароль",
                inputType: "password",
                model: "password",
            },
        ],
        footer: {
            link: "#",
            linkText: "Регистрация",
            btn: "Войти",
            btnTypeSet: "register",
        },
    },
    register: {
        title: "Регистрация",
        body: [
            {
                label: "Логин",
                inputType: "text",
                model: "login",
            },
            {
                label: "Пароль",
                inputType: "password",
                model: "password",
            },
            {
                label: "Роль",
                inputType: [
                    {
                        option: 'Выберите роль',
                        value: '',
                        selected: true,
                        disabled: true
                    },
                    {
                        option: "Пользователь",
                        value: "user"
                    },
                    {
                        option: 'Создатель',
                        value: "creator"
                    }
                ],
                model: "role"
            }
        ],
        footer: {
            link: "#",
            linkText: "Вход",
            btn: "Регистрация",
            btnTypeSet: "login",
        },
    },
};

const data = {
    login: "",
    password: "",
    role: "",
};

const setType = (event: Event, value: Type) => {
    event.preventDefault();
    currentType.value = value;
    data.login = ''
    data.password = ''
};
</script>

<style>
.form-wrap {
    width: 370px;
    border-radius: 14px;
    background-color: #f0c7ff;
    padding: 30px;
}

.form-body {
    margin-top: 10px;
}

.form-title {
    font-size: 32px;
    font-weight: 600;
}

.form-row {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
}

.form-label {
    margin-bottom: 10px;
}
.form-input {
    height: 45px;
    border-radius: 10px;
    border: 0;
    outline: 0px;
    padding: 0px 10px;
}

.form-footer {
    margin-top: 10px;
    display: flex;
}

.footer-btn {
    margin-left: auto;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: white;
    background-image: url("@/assets/arrow.svg");
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 18px;
}
</style>

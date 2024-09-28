<template>
    <div class="message" :class="{ 'message-user': role === 'user' }">
        <div class="avatorContainer">
            <img src="../assets/logo.svg" class="avator unselectable" :class="{ 'hide': role === 'user' }">
        </div>

        <div class="avatorContainer">
            <img src="../assets/user.svg" class="avator unselectable" :class="{ 'hide': role === 'assistant' }">
        </div>


        <div class="text" :class="{ 'text-user': role === 'user', 'text-bot': role === 'assistant' }">
            <Text :text="text" />
            <Text text="
$\frac{114514}{1919810}$
$$\frac{114514}{1919810}$$
```cpp
#include <iostream>
```
```python
print(input())
```
# 你好

$$
\int_{a}^{b} f(x)\,dx = -\int_{b}^{a} f(x)\,dx, \quad \text{且} \quad \left(\frac{\partial x}{\partial y}\right)^2 = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
$$

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}, \quad \text{对于} \quad ax^2 + bx + c = 0
$$

$$
e^{i\pi} + 1 = 0
$$

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

$$
\mathbf{A} =
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$


            " />

        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Text from './Text.vue';
//数组的接收方法
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.message-user {
    display: flex;
    /* 启用flexbox布局 */
    flex-direction: column;
    align-items: flex-end;
}

.hide {
    display: none
}

.text {
    display: inline-block;
    margin: 10px 10px 20px 10px;
    padding: 20px 25px;
    border-radius: 28px;
    /*box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;*/
}

.text-bot {
    background-color: rgb(235, 235, 235);
}

.text-user {
    margin-top: 5px;
    background-color: rgb(210, 249, 209);

}

.unselectable {
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* IE 10+ 和 Edge */
    user-select: none;
    /* 标准语法 */
    pointer-events: none;
}

.avatorContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 52px;
    height: 52px;
    margin: 2px;
}

.avator {
    display: flex;

    width: 48px;
    height: 48px;
    border-radius: 5px
}
</style>
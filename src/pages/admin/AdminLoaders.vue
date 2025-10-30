<template>
    <div class="custom-loader">
        <div class="loader-container">
            <div class="progress-dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="loader-text">Processing</p>
        </div>
    </div>
</template>

<style>
.custom-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loader-container {
    text-align: center;
    color: #ffffff;
}

.progress-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
}

.progress-dots span {
    width: 12px;
    height: 12px;
    background-color:  #1c3a66;
    border-radius: 50%;
    animation: wave 1.4s infinite ease-in-out;
}

.progress-dots span:nth-child(1) {
    animation-delay: 0s;
}

.progress-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.progress-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

.progress-dots span:nth-child(4) {
    animation-delay: 0.6s;
}

.progress-dots span:nth-child(5) {
    animation-delay: 0.8s;
}

.loader-text {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
}

@keyframes wave {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.5);
        opacity: 1;
    }
}
</style>

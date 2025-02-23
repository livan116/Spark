import React from 'react'
import style from './LandingPage.module.css'
import sparklogo from '../../assets/spark.png'
import analytic1img from '../../assets/Analytics1.png'
import analytic2img from '../../assets/div.png'
import analytic3img from '../../assets/div1.png'

const LandingPage = () => {
    return (
        <>
            <div className={style.main_container}>
                <nav className={style.nav_spark}>
                    <div className={style.spark}>
                        <img src={sparklogo} alt="spark" />
                        <span className={style.sparkTitle}>SPARK</span> | <span className={style.market}>Marketplace</span>
                    </div>
                    <div className={style.nav_btn}>
                        <button>Sign up free</button>
                    </div>
                </nav>
                {/* container2 */}
                <div className={style.container2}>
                    <div className={style.container2_left}>
                        <h2>The easiest place to update and share your Connection</h2>
                        <p>Help your followers discover everything you’re sharing all over the internet, in one simple place. They’ll thank you for it!</p>
                        <button className={style.container2_leftBtn}>Get your free Spark</button>
                    </div>
                    <div className={style.container2_right}>
                        <img src={analytic1img} alt="analytics.img" />
                    </div>
                </div>
                {/* container3 */}
                <div className={style.container3}>
                    <div className={style.container3_left}>
                        <div className={style.container3_leftImg}>
                            <img src={analytic2img} alt="revenue-analytics" />
                        </div>
                        <p>Sell products and collect payments. It’s monetization made simple.</p>
                    </div>
                    <div className={style.container3_right}>
                        <h2>Analyze your audience <br /> and keep your followers <br /> engaged</h2>
                        <p>
                            Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.
                        </p>
                    </div>
                </div>
                {/* container 3 end */}

                {/* container4 start */}
                <div className={style.container4}>
                    <div className={style.container4_left}>
                        <h2>Share limitless content <br /> in limitless ways</h2>
                        <p>
                            Connect your content in all its forms and help followers find more of what they’re looking for.
                            Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more...
                            It all comes together in one powerful place.
                        </p>
                    </div>
                    <div className={style.container4_right}>
                        <div className={style.container4_rightImg}>
                            <img src={analytic3img} alt="content" className={style.content_image} />
                        </div>
                        <p className={style.content_caption}>Share your content in limitless ways on your Spark</p>
                    </div>
                </div>
                {/* container4 end */}

                {/* container5 start */}
                <div className={style.container5}>
                    <div className={style.container5_left}>
                        <h2>
                            Here's what our <span className={style.highlight}>customer</span> <br />
                            has to says
                        </h2>
                        <button className={style.customer_btn}>Read customer stories</button>
                    </div>
                    <div className={style.container5_right}>
                        <span className={style.icon}>✳️</span>
                        <p>
                            <strong>[short description goes in here]</strong> Lorem ipsum is a placeholder text to demonstrate.
                        </p>
                    </div>
                </div>

                {/* container5 end */}

            </div>

        </>
    )
}

export default LandingPage
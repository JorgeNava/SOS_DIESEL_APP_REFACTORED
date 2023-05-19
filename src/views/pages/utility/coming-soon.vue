<script>
export default {
  data() {
    return {
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      starttime: "May 13, 2023 15:37:25",
      endtime: "May 25, 2023 16:37:25"
    };
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
      }
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <a href="index.html">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100 py-4">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="index.html" class="logo">
                            <img src="@/assets/images/logo-dark.png" height="80" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">Coming soon with SOS Diesel!</h4>
                      </div>

                      <div class="p-2 mt-5">
                        <div data-countdown="2023/05/25" class="counter-number">
                          <div class="coming-box">
                            {{ days }}
                            <span>Days</span>
                          </div>
                          <div class="coming-box">
                            {{ hours }}
                            <span>Hours</span>
                          </div>
                          <div class="coming-box">
                            {{ minutes }}
                            <span>Minutes</span>
                          </div>
                          <div class="coming-box">
                            {{ seconds }}
                            <span>Seconds</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg comingsoon-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
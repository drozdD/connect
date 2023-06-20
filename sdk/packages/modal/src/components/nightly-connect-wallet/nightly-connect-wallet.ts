import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../shared/tailwind.element'
import vector from '../../static/svg/backButton.svg'
import { Breakpoint, getBreakpointFromWidthInConnectWallet } from '../../utils/utils'
import '../nightly-header-small-page/nightly-header-small-page'
import '../nightly-header/nightly-header'
import style from './nightly-connect-wallet.css?inline'
@customElement('nightly-connect-wallet')
export class NightlyConnectWallet extends TailwindElement(style) {
  @property({ type: Boolean })
  connecting = false

  @property({ type: Boolean })
  connected = false

  @property({ type: String })
  nameLink = ''

  @property({ type: String })
  link = ''

  @property({ type: String })
  walletIcon = ''

  @property({ type: String })
  coinName = ''

  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {}

  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {}

  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fallback = () => {}

  breakpoint: Breakpoint

  constructor() {
    super()
    this.breakpoint = 'sm'
    this.updateBreakpoint()
    this.resizeListener()
  }

  updateBreakpoint() {
    const screenWidth = window.innerWidth
    this.breakpoint = getBreakpointFromWidthInConnectWallet(screenWidth)
  }

  resizeListener() {
    window.addEventListener('resize', () => {
      this.updateBreakpoint()
      this.requestUpdate()
    })
  }

  render() {
    if (window.innerWidth < 560) {
      return this.connected
        ? ''
        : html`
            <nightly-header-small-page .onClose=${this.onClose}></nightly-header-small-page>
            <div class="wrapperPage">
              <div class="headerContainer">
                <div class="buttonContainer">
                  <button @click=${this.fallback}>
                    <img class="vector" src=${vector} />
                  </button>
                </div>
                <div class="textContainer">
                  <span>Connect wallet</span>
                </div>
              </div>
              <div class="coinInfoContainer">
                <img src=${this.walletIcon} />
                <span class="coinName">${this.coinName}</span>
                ${this.connecting
                  ? html` <div class="connectingContainer">
                      <span>Connecting... </span>
                      <div class="custom-loader"></div>
                    </div>`
                  : html` <span class="error">Connecting failed</span> `}
              </div>
              <div class="reConnectWrapper">
                <p>
                  Connecting takes too long? Make sure ${this.nameLink} is installed on your device.
                  Otherwise, visit
                  <a class="link" href="${this.link}">${this.nameLink}</a>
                  to download it.
                </p>
                <button @click=${this.onClick}>Try again</button>
              </div>
            </div>
          `
    } else {
      return this.connected
        ? ''
        : html`
            <div class="mainContainer">
              <nightly-header .onClose=${this.onClose}></nightly-header>
              <div class="wrapperConnectPage">
                <div class="headerContainer">
                  <div class="buttonContainer">
                    <button @click=${this.fallback}>
                      <img class="vector" src=${vector} />
                    </button>
                  </div>
                  <div class="textContainer">
                    <span>Connect wallet</span>
                  </div>
                </div>
                <div class="coinInfoContainer">
                  <img src=${this.walletIcon} />
                  <span class="coinName">${this.coinName}</span>
                  ${this.connecting
                    ? html` <div class="connectingContainer">
                        <span>Connecting... </span>
                        <div class="custom-loader"></div>
                      </div>`
                    : html` <span class="error">Connecting failed</span> `}
                </div>
                <div class="reConnectWrapper">
                  <p>
                    Connecting takes too long? Make sure ${this.nameLink} is installed on your
                    device. Otherwise, visit
                    <a class="link" href="${this.link}">${this.nameLink}</a>
                    to download it.
                  </p>
                  <button @click=${this.onClick}>Try again</button>
                </div>
              </div>
            </div>
          `
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-connect-wallet': NightlyConnectWallet
  }
}

import { Complex } from "./Complex.ts"

const tau = 2 * Math.PI

const fftProto = (isInverse: boolean) => (p: Complex[]) => {
    const n = p.length
    if (n == 1) return p
    const w = new Complex(
        Math.cos(tau / n),
        Math.sin(tau / n) * (isInverse ? -1 : 1),
    )
    const [yEven, yOdd] = [
        fft(p.filter((_, i) => i % 2 == 0)),
        fft(p.filter((_, i) => i % 2 == 1)),
    ]
    const y: Complex[] = Array(n).fill(undefined).fill(new Complex(0))
    let wJ = new Complex(1)
    for (let j=0;j<n/2;j++) {
        y[j] = yEven[j].add(wJ.mul(yOdd[j]))
        y[j + n/2] = yEven[j].sub(wJ.mul(yOdd[j]))
        wJ = wJ.mul(w)
    }
    if (isInverse) return y.map(c => c.mul(new Complex(1 / n)))
    else return y
}

export const fft = fftProto(false)
export const ifft = fftProto(true)
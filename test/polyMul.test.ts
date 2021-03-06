import { assertEquals } from "https://deno.land/std@0.147.0/testing/asserts.ts"
import {
    Complex,
    fft,
    ifft, 
    slowFt,
    iSlowFt
} from "../mod.ts"

Deno.test("Polynomial Multiply - FFT", () => {
    assertEquals(
        fft([4,3,2,1].map(n => new Complex(n)))+"",
        "10,2+2i,2,2-2i"
    )
    assertEquals(
        ifft(
            fft([4,3,2,1,0,0,0,0])          // x^3 + 2x^2 + 3x + 4
            .mul(fft([2,-1,3,-5,0,0,0,0]))  // -5x^3 + 3x^2 - x + 2
        )+"",
        "8,2,13,-11,-10,-7,-5,0"
    )
})
Deno.test("Polynomial Multiply - SlowFT", () => {
    assertEquals(
        slowFt([4,3,2,1].map(n => new Complex(n)))+"",
        "10,2+2i,2,2-2i"
    )
    assertEquals(
        iSlowFt(
            slowFt([4,3,2,1,0,0,0,0])          // x^3 + 2x^2 + 3x + 4
            .mul(slowFt([2,-1,3,-5,0,0,0,0]))  // -5x^3 + 3x^2 - x + 2
        )+"",
        "8,2,13,-11,-10,-7,-5,0"
    )
})
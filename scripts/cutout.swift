// Cut the foreground subject (plate of food) out of each photo using
// Vision's foreground instance mask, save as transparent PNG.
// Usage: swift cutout.swift <outdir> <input1> [input2 ...]
import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("usage: cutout.swift <outdir> <inputs...>")
    exit(1)
}
let outDir = args[1]
let ctx = CIContext()

for inPath in args.dropFirst(2) {
    let url = URL(fileURLWithPath: inPath)
    guard let image = CIImage(contentsOf: url) else {
        print("SKIP (unreadable): \(inPath)")
        continue
    }
    let request = VNGenerateForegroundInstanceMaskRequest()
    let handler = VNImageRequestHandler(ciImage: image)
    do {
        try handler.perform([request])
        guard let obs = request.results?.first else {
            print("SKIP (no foreground found): \(inPath)")
            continue
        }
        let maskBuffer = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
        let mask = CIImage(cvPixelBuffer: maskBuffer)

        let blend = CIFilter(name: "CIBlendWithMask")!
        blend.setValue(image, forKey: kCIInputImageKey)
        blend.setValue(CIImage(color: .clear).cropped(to: image.extent), forKey: kCIInputBackgroundImageKey)
        blend.setValue(mask, forKey: kCIInputMaskImageKey)
        let out = blend.outputImage!.cropped(to: image.extent)

        let name = url.deletingPathExtension().lastPathComponent + ".png"
        let outURL = URL(fileURLWithPath: outDir).appendingPathComponent(name)
        try ctx.writePNGRepresentation(
            of: out,
            to: outURL,
            format: .RGBA8,
            colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
        )
        print("OK: \(name)")
    } catch {
        print("FAIL \(inPath): \(error)")
    }
}

import { Point } from '../model';
export default class CoOrdinateSystem {
  private extent = [new Point(-100, -100), new Point(100, 100)];

  private initialScale = 0.1;

  // 是否保持横宽比
  private preserveAspectRatio = true;

  constructor() {}

  public setExtent(extent: Point[]) {
    this.extent = extent;
  }

  public getWidth() {
    const [extent1, extent2] = this.extent;
    return Math.abs(extent2.x - extent1.x);
  }

  public getHeight() {
    const [extent1, extent2] = this.extent;
    return Math.abs(extent2.y - extent1.y);
  }

  /**
   * @description: 设置init scale 处理
   * @param {number} initialScale
   * @return {*}
   */
  public setInitialScale(initialScale: number) {
    this.initialScale = initialScale;
  }

  public viewScaleX = 1;

  public viewScaleY = 1;

  // x 轴是否翻转
  public flipX = 1;

  // y轴是否翻转
  public flipY = 1;

  /**
   * @description: 获取缩放比例
   * @return {*}
   */
  public getInitialScale(): number {
    return this.initialScale;
  }

  public setPreserveAspectRatio(preserveAspectRatio: boolean) {
    this.preserveAspectRatio = preserveAspectRatio;
  }

  public getPreserveAspectRatio() {
    return this.preserveAspectRatio;
  }

  public getViewScaleX() {
    return this.viewScaleX;
  }

  public getViewScaleY() {
    return this.viewScaleY;
  }
  public setViewScaleX(viewScaleX: number) {
    this.viewScaleX = viewScaleX;
  }

  public setViewScaleY(viewScaleY: number) {
    this.viewScaleY = viewScaleY;
  }

  public setFlipX(flipX: number) {
    this.flipX = flipX;
  }

  public setFlipY(flipY: number) {
    this.flipY = flipY;
  }
}

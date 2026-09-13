declare module "mockjs" {
    const Mock: {
        mock(url: string, method: string, template: () => Record<string, unknown>): unknown
    }
    export default Mock
}
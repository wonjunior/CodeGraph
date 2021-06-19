
/**
 * Factory class for all HTML elements defined with a HTML template.
 */
export default class Template {
	/**
	 * Retrieves the template from the DOM then clones its content.
	 * @param name template's name
	 * @return a `querySelector` bound to the cloned template element
	 */
	public static import(name: string, variant = ''): (selectors: string) => HTMLElement | null {
		const id = `template#${name}${variant ? '-' : ''}${variant}`
		const template = document.querySelector(id) as HTMLTemplateElement
		if (template == null) throw new Error(`could not find template with id ${id}`)

		const element = document.importNode(template.content, true)
		return element.querySelector.bind(element)
	}
}
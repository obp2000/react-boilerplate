import type { RawOptionsAndCommonConsts } from '@/interfaces/options'

export const transformOptionsResponse = (data: RawOptionsAndCommonConsts) => ({
	commonConsts: data?.common_consts,
	options: data?.actions?.POST ?? data?.actions?.PUT,
})

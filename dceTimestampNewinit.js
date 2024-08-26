const getTableData = () => {
	return {
		"version" : "55.0",
		"nodes" : {
		  "LOAD_DATASET0" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "AccountId", "SerialNumber", "External_Id__c", "Nickname__c", "Primary_Location__c", "Product_Number__c", "Product_Series_Name__c", "Product_Support_Hierarchy__c", "Product_Type_Name__c", "Internal_Status__c", "SystemModstamp" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "Asset",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "Asset"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET1" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Product_Type_Name__c", "Product_Line_Name__c", "Support_Name__c", "Support_Oid__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "ProductSupportHierarchy__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "ProductSupportHierarchy__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "JOIN0" : {
			"action" : "join",
			"sources" : [ "FILTER0", "LOAD_DATASET1" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LOOKUP",
			  "leftKeys" : [ "Product_Support_Hierarchy__c" ],
			  "rightQualifier" : "ProductSup",
			  "rightKeys" : [ "Id" ]
			}
		  },
		  "LOAD_DATASET7" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Asset__c", "Contract_Level__c", "End_Date__c", "Start_Date__c", "Support_Level__c", "Contract_Level_Rank__c", "Support_Level_Rank__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "AssetSupportLevel__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "AssetSupportLevel__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "JOIN5" : {
			"action" : "join",
			"sources" : [ "JOIN8", "FILTER2" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LOOKUP",
			  "leftKeys" : [ "Id" ],
			  "rightQualifier" : "AssetSuppo",
			  "rightKeys" : [ "Asset__c" ]
			}
		  },
		  "LOAD_DATASET8" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Name", "Country__c", "City__c", "State__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "Location__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "Location__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET9" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Asset__c", "SAR__c", "Entitlement__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "AssetEntitlementRelation__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "AssetEntitlementRelation__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "JOIN8" : {
			"action" : "join",
			"sources" : [ "JOIN0", "LOAD_DATASET9" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LOOKUP",
			  "leftKeys" : [ "Id" ],
			  "rightQualifier" : "AssetEntit",
			  "rightKeys" : [ "Asset__c" ]
			}
		  },
		  "FILTER0" : {
			"action" : "filter",
			"sources" : [ "LOAD_DATASET0" ],
			"parameters" : {
			  "filterExpressions" : [ {
				"type" : "TEXT",
				"field" : "Internal_Status__c",
				"operator" : "EQUAL",
				"operands" : [ "Active" ]
			  } ]
			}
		  },
		  "FORMULA1" : {
			"action" : "formula",
			"sources" : [ "LOAD_DATASET8" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "CountryName",
				"label" : "Country Name",
				"formulaExpression" : "case \"Country__c\"\r\nwhen 'AF' then 'Afghanistan'\r\nwhen 'AX' then 'Aland Islands'\r\nwhen 'AL' then 'Albania'\r\nwhen 'DZ' then 'Algeria'\r\nwhen 'AS' then 'American Samoa'\r\nwhen 'AD' then 'Andorra'\r\nwhen 'AO' then 'Angola'\r\nwhen 'AI' then 'Anguilla'\r\nwhen 'AQ' then 'Antarctica'\r\nwhen 'AG' then 'Antigua and Barbuda'\r\nwhen 'AR' then 'Argentina'\r\nwhen 'AM' then 'Armenia'\r\nwhen 'AW' then 'Aruba'\r\nwhen 'AU' then 'Australia'\r\nwhen 'AT' then 'Austria'\r\nwhen 'AZ' then 'Azerbaijan'\r\nwhen 'BS' then 'Bahamas'\r\nwhen 'BH' then 'Bahrain'\r\nwhen 'BD' then 'Bangladesh'\r\nwhen 'BB' then 'Barbados'\r\nwhen 'BY' then 'Belarus'\r\nwhen 'BE' then 'Belgium'\r\nwhen 'BZ' then 'Belize'\r\nwhen 'BJ' then 'Benin'\r\nwhen 'BM' then 'Bermuda'\r\nwhen 'BT' then 'Bhutan'\r\nwhen 'BO' then 'Bolivia, Plurinational State of'\r\nwhen 'BQ' then 'Bonaire, Sint Eustatius and Saba'\r\nwhen 'BA' then 'Bosnia and Herzegovina'\r\nwhen 'BW' then 'Botswana'\r\nwhen 'BV' then 'Bouvet Island'\r\nwhen 'BR' then 'Brazil'\r\nwhen 'IO' then 'British Indian Ocean Territory'\r\nwhen 'BN' then 'Brunei Darussalam'\r\nwhen 'BG' then 'Bulgaria'\r\nwhen 'BF' then 'Burkina Faso'\r\nwhen 'BI' then 'Burundi'\r\nwhen 'KH' then 'Cambodia'\r\nwhen 'CM' then 'Cameroon'\r\nwhen 'CA' then 'Canada'\r\nwhen 'CV' then 'Cabo Verde'\r\nwhen 'KY' then 'Cayman Islands'\r\nwhen 'CF' then 'Central African Republic'\r\nwhen 'TD' then 'Chad'\r\nwhen 'CL' then 'Chile'\r\nwhen 'CN' then 'China'\r\nwhen 'CX' then 'Christmas Island'\r\nwhen 'CC' then 'Cocos (Keeling) Islands'\r\nwhen 'CO' then 'Colombia'\r\nwhen 'KM' then 'Comoros'\r\nwhen 'CG' then 'Congo'\r\nwhen 'CD' then 'Congo, the Democratic Republic of the'\r\nwhen 'CK' then 'Cook Islands'\r\nwhen 'CR' then 'Costa Rica'\r\nwhen 'CI' then 'Cote d''Ivoire'\r\nwhen 'HR' then 'Croatia'\r\nwhen 'CW' then 'Curaçao'\r\nwhen 'CY' then 'Cyprus'\r\nwhen 'CZ' then 'Czech Republic'\r\nwhen 'DK' then 'Denmark'\r\nwhen 'DJ' then 'Djibouti'\r\nwhen 'DM' then 'Dominica'\r\nwhen 'DO' then 'Dominican Republic'\r\nwhen 'EC' then 'Ecuador'\r\nwhen 'EG' then 'Egypt'\r\nwhen 'SV' then 'El Salvador'\r\nwhen 'GQ' then 'Equatorial Guinea'\r\nwhen 'ER' then 'Eritrea'\r\nwhen 'EE' then 'Estonia'\r\nwhen 'ET' then 'Ethiopia'\r\nwhen 'FK' then 'Falkland Islands (Malvinas)'\r\nwhen 'FO' then 'Faroe Islands'\r\nwhen 'FJ' then 'Fiji'\r\nwhen 'FI' then 'Finland'\r\nwhen 'FR' then 'France'\r\nwhen 'GF' then 'French Guiana'\r\nwhen 'PF' then 'French Polynesia'\r\nwhen 'TF' then 'French Southern Territories'\r\nwhen 'GA' then 'Gabon'\r\nwhen 'GM' then 'Gambia'\r\nwhen 'GE' then 'Georgia'\r\nwhen 'DE' then 'Germany'\r\nwhen 'GH' then 'Ghana'\r\nwhen 'GI' then 'Gibraltar'\r\nwhen 'GR' then 'Greece'\r\nwhen 'GL' then 'Greenland'\r\nwhen 'GD' then 'Grenada'\r\nwhen 'GP' then 'Guadeloupe'\r\nwhen 'GU' then 'Guam'\r\nwhen 'GT' then 'Guatemala'\r\nwhen 'GG' then 'Guernsey'\r\nwhen 'GN' then 'Guinea'\r\nwhen 'GW' then 'Guinea-Bissau'\r\nwhen 'GY' then 'Guyana'\r\nwhen 'HT' then 'Haiti'\r\nwhen 'HM' then 'Heard Island and McDonald Islands'\r\nwhen 'VA' then 'Holy See'\r\nwhen 'HN' then 'Honduras'\r\nwhen 'HK' then 'Hong Kong'\r\nwhen 'HU' then 'Hungary'\r\nwhen 'IS' then 'Iceland'\r\nwhen 'IN' then 'India'\r\nwhen 'ID' then 'Indonesia'\r\nwhen 'IQ' then 'Iraq'\r\nwhen 'IE' then 'Ireland'\r\nwhen 'IM' then 'Isle of Man'\r\nwhen 'IL' then 'Israel'\r\nwhen 'IT' then 'Italy'\r\nwhen 'JM' then 'Jamaica'\r\nwhen 'JP' then 'Japan'\r\nwhen 'JE' then 'Jersey'\r\nwhen 'JO' then 'Jordan'\r\nwhen 'KZ' then 'Kazakhstan'\r\nwhen 'KE' then 'Kenya'\r\nwhen 'KI' then 'Kiribati'\r\nwhen 'KR' then 'Korea, Republic of'\r\nwhen 'XK' then 'Kosovo'\r\nwhen 'KW' then 'Kuwait'\r\nwhen 'KG' then 'Kyrgyzstan'\r\nwhen 'LA' then 'Lao People''s Democratic Republic'\r\nwhen 'LV' then 'Latvia'\r\nwhen 'LB' then 'Lebanon'\r\nwhen 'LS' then 'Lesotho'\r\nwhen 'LR' then 'Liberia'\r\nwhen 'LY' then 'Libya'\r\nwhen 'LI' then 'Liechtenstein'\r\nwhen 'LT' then 'Lithuania'\r\nwhen 'LU' then 'Luxembourg'\r\nwhen 'MO' then 'Macao'\r\nwhen 'MG' then 'Madagascar'\r\nwhen 'MW' then 'Malawi'\r\nwhen 'MY' then 'Malaysia'\r\nwhen 'MV' then 'Maldives'\r\nwhen 'ML' then 'Mali'\r\nwhen 'MT' then 'Malta'\r\nwhen 'MH' then 'Marshall Islands'\r\nwhen 'MQ' then 'Martinique'\r\nwhen 'MR' then 'Mauritania'\r\nwhen 'MU' then 'Mauritius'\r\nwhen 'YT' then 'Mayotte'\r\nwhen 'MX' then 'Mexico'\r\nwhen 'FM' then 'Micronesia (Federated States of)'\r\nwhen 'MD' then 'Moldova, Republic of'\r\nwhen 'MC' then 'Monaco'\r\nwhen 'MN' then 'Mongolia'\r\nwhen 'ME' then 'Montenegro'\r\nwhen 'MS' then 'Montserrat'\r\nwhen 'MA' then 'Morocco'\r\nwhen 'MZ' then 'Mozambique'\r\nwhen 'MM' then 'Myanmar'\r\nwhen 'NA' then 'Namibia'\r\nwhen 'NR' then 'Nauru'\r\nwhen 'NP' then 'Nepal'\r\nwhen 'NL' then 'Netherlands'\r\nwhen 'NC' then 'New Caledonia'\r\nwhen 'NZ' then 'New Zealand'\r\nwhen 'NI' then 'Nicaragua'\r\nwhen 'NE' then 'Niger'\r\nwhen 'NG' then 'Nigeria'\r\nwhen 'NU' then 'Niue'\r\nwhen 'NF' then 'Norfolk Island'\r\nwhen 'MK' then 'North Macedonia'\r\nwhen 'MP' then 'Northern Mariana Islands'\r\nwhen 'NO' then 'Norway'\r\nwhen 'OM' then 'Oman'\r\nwhen 'PK' then 'Pakistan'\r\nwhen 'PW' then 'Palau'\r\nwhen 'PS' then 'Palestine'\r\nwhen 'PA' then 'Panama'\r\nwhen 'PG' then 'Papua New Guinea'\r\nwhen 'PY' then 'Paraguay'\r\nwhen 'PE' then 'Peru'\r\nwhen 'PH' then 'Philippines'\r\nwhen 'PN' then 'Pitcairn'\r\nwhen 'PL' then 'Poland'\r\nwhen 'PT' then 'Portugal'\r\nwhen 'PR' then 'Puerto Rico'\r\nwhen 'QA' then 'Qatar'\r\nwhen 'RE' then 'Reunion'\r\nwhen 'RO' then 'Romania'\r\nwhen 'RU' then 'Russian Federation'\r\nwhen 'RW' then 'Rwanda'\r\nwhen 'WS' then 'Samoa'\r\nwhen 'SM' then 'San Marino'\r\nwhen 'ST' then 'Sao Tome and Principe'\r\nwhen 'SA' then 'Saudi Arabia'\r\nwhen 'SN' then 'Senegal'\r\nwhen 'RS' then 'Serbia'\r\nwhen 'SC' then 'Seychelles'\r\nwhen 'SL' then 'Sierra Leone'\r\nwhen 'SG' then 'Singapore'\r\nwhen 'SX' then 'Sint Maarten (Dutch part)'\r\nwhen 'SK' then 'Slovakia'\r\nwhen 'SI' then 'Slovenia'\r\nwhen 'GS' then 'South Georgia and the South Sandwich Islands'\r\nwhen 'SB' then 'Solomon Islands'\r\nwhen 'SO' then 'Somalia'\r\nwhen 'ZA' then 'South Africa'\r\nwhen 'SS' then 'South Sudan'\r\nwhen 'ES' then 'Spain'\r\nwhen 'LK' then 'Sri Lanka'\r\nwhen 'BL' then 'Saint Barthélemy'\r\nwhen 'SH' then 'Saint Helena, Ascension and Tristan da Cunha'\r\nwhen 'KN' then 'Saint Kitts and Nevis'\r\nwhen 'LC' then 'Saint Lucia'\r\nwhen 'MF' then 'Saint Martin (French part)'\r\nwhen 'PM' then 'Saint Pierre and Miquelon'\r\nwhen 'VC' then 'Saint Vincent and the Grenadines'\r\nwhen 'SD' then 'Sudan'\r\nwhen 'SR' then 'Suriname'\r\nwhen 'SJ' then 'Svalbard and Jan Mayen'\r\nwhen 'SZ' then 'Eswatini'\r\nwhen 'SE' then 'Sweden'\r\nwhen 'CH' then 'Switzerland'\r\nwhen 'TW' then 'Taiwan'\r\nwhen 'TJ' then 'Tajikistan'\r\nwhen 'TZ' then 'Tanzania, United Republic of'\r\nwhen 'TH' then 'Thailand'\r\nwhen 'TL' then 'Timor-Leste'\r\nwhen 'TG' then 'Togo'\r\nwhen 'TK' then 'Tokelau'\r\nwhen 'TO' then 'Tonga'\r\nwhen 'TT' then 'Trinidad and Tobago'\r\nwhen 'TN' then 'Tunisia'\r\nwhen 'TR' then 'Turkey'\r\nwhen 'TM' then 'Turkmenistan'\r\nwhen 'TC' then 'Turks and Caicos Islands'\r\nwhen 'TV' then 'Tuvalu'\r\nwhen 'UM' then 'United States Minor Outlying Islands'\r\nwhen 'UG' then 'Uganda'\r\nwhen 'UA' then 'Ukraine'\r\nwhen 'AE' then 'United Arab Emirates'\r\nwhen 'GB' then 'United Kingdom'\r\nwhen 'US' then 'United States'\r\nwhen 'UY' then 'Uruguay'\r\nwhen 'UZ' then 'Uzbekistan'\r\nwhen 'VU' then 'Vanuatu'\r\nwhen 'VE' then 'Venezuela, Bolivarian Republic of'\r\nwhen 'VN' then 'Vietnam'\r\nwhen 'VG' then 'Virgin Islands, British'\r\nwhen 'VI' then 'Virgin Islands, U.S.'\r\nwhen 'WF' then 'Wallis and Futuna'\r\nwhen 'EH' then 'Western Sahara'\r\nwhen 'YE' then 'Yemen'\r\nwhen 'ZM' then 'Zambia'\r\nwhen 'ZW' then 'Zimbabwe'\r\nelse null\r\nend",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "LOAD_DATASET12" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "ContactId", "AccountId", "AssetId", "ClosedDate", "CreatedDate", "ContactEmail", "Electronic_Country_Code__c", "Service_Portfolio__c", "Asset_Nickname__c", "Alternate_Customer_Email__c", "Contract_Identifier__c", "Customer_Case_Status__c", "PANHPE_Case_Number__c", "Product_Number__c", "Severity__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "Case",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "Case"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "FORMULA4" : {
			"action" : "formula",
			"sources" : [ "FILTER1" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "Service_Portfolio_Grouping",
				"label" : "Service_Portfolio_Grouping",
				"formulaExpression" : "case when Service_Portfolio__c in ('Warranty','Standard Warranty','Extended Warranty','Installation','Proactive','Manual Entitlement') then 'No Contract'\r\nwhen Service_Portfolio__c in ('Complete Care','Datacenter Care','Datacenter Care Hyperscale','Legacy MC','Mission Critical','Proactive Care Advanced') then 'Complete Care'\r\nwhen Service_Portfolio__c in ('Contract','Proactive Care','Tech care') then 'Tech Care'\r\nelse 'No Contract' end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA5" : {
			"action" : "formula",
			"sources" : [ "FORMULA4" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "NUMBER",
				"name" : "Case_Created_Days",
				"label" : "Case_Created_Days",
				"formulaExpression" : "datediff(current_date(), CreatedDate)",
				"precision" : 10,
				"scale" : 0,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA7" : {
			"action" : "formula",
			"sources" : [ "FORMULA5" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "ServicePortfolio",
				"label" : "Support Level",
				"formulaExpression" : "case when Service_Portfolio__c in ('Warranty','Standard Warranty') then 'No Contract'\r\nwhen Service_Portfolio__c in ('Complete Care','Datacenter Care','Datacenter Care Hyperscale') then 'Complete Care'\r\nwhen Service_Portfolio__c in ('Contract','Extended Warranty') then 'Foundation Care'\r\nwhen Service_Portfolio__c in ('Legacy MC','Mission Critical') then 'Mission Critical'\r\nwhen Service_Portfolio__c in ('Proactive Care') then 'Proactive Care'\r\nwhen Service_Portfolio__c in ('Proactive Care Advanced') then 'Proactive Care Advanced'\r\nwhen Service_Portfolio__c in ('Tech Care') then 'Tech care'\r\nwhen Service_Portfolio__c in ('Installation') then 'Installation'\r\nwhen Service_Portfolio__c in ('Proactive','Manual Entitlement') then 'Other'\r\nelse 'No Contract' end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA8" : {
			"action" : "formula",
			"sources" : [ "FORMULA7" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "CaseCountry",
				"label" : "Case Country",
				"formulaExpression" : "case Electronic_Country_Code__c\r\nwhen 'AF' then 'Afghanistan'\r\nwhen 'AX' then 'Aland Islands'\r\nwhen 'AL' then 'Albania'\r\nwhen 'DZ' then 'Algeria'\r\nwhen 'AS' then 'American Samoa'\r\nwhen 'AD' then 'Andorra'\r\nwhen 'AO' then 'Angola'\r\nwhen 'AI' then 'Anguilla'\r\nwhen 'AQ' then 'Antarctica'\r\nwhen 'AG' then 'Antigua and Barbuda'\r\nwhen 'AR' then 'Argentina'\r\nwhen 'AM' then 'Armenia'\r\nwhen 'AW' then 'Aruba'\r\nwhen 'AU' then 'Australia'\r\nwhen 'AT' then 'Austria'\r\nwhen 'AZ' then 'Azerbaijan'\r\nwhen 'BS' then 'Bahamas'\r\nwhen 'BH' then 'Bahrain'\r\nwhen 'BD' then 'Bangladesh'\r\nwhen 'BB' then 'Barbados'\r\nwhen 'BY' then 'Belarus'\r\nwhen 'BE' then 'Belgium'\r\nwhen 'BZ' then 'Belize'\r\nwhen 'BJ' then 'Benin'\r\nwhen 'BM' then 'Bermuda'\r\nwhen 'BT' then 'Bhutan'\r\nwhen 'BO' then 'Bolivia, Plurinational State of'\r\nwhen 'BQ' then 'Bonaire, Sint Eustatius and Saba'\r\nwhen 'BA' then 'Bosnia and Herzegovina'\r\nwhen 'BW' then 'Botswana'\r\nwhen 'BV' then 'Bouvet Island'\r\nwhen 'BR' then 'Brazil'\r\nwhen 'IO' then 'British Indian Ocean Territory'\r\nwhen 'BN' then 'Brunei Darussalam'\r\nwhen 'BG' then 'Bulgaria'\r\nwhen 'BF' then 'Burkina Faso'\r\nwhen 'BI' then 'Burundi'\r\nwhen 'KH' then 'Cambodia'\r\nwhen 'CM' then 'Cameroon'\r\nwhen 'CA' then 'Canada'\r\nwhen 'CV' then 'Cabo Verde'\r\nwhen 'KY' then 'Cayman Islands'\r\nwhen 'CF' then 'Central African Republic'\r\nwhen 'TD' then 'Chad'\r\nwhen 'CL' then 'Chile'\r\nwhen 'CN' then 'China'\r\nwhen 'CX' then 'Christmas Island'\r\nwhen 'CC' then 'Cocos (Keeling) Islands'\r\nwhen 'CO' then 'Colombia'\r\nwhen 'KM' then 'Comoros'\r\nwhen 'CG' then 'Congo'\r\nwhen 'CD' then 'Congo, the Democratic Republic of the'\r\nwhen 'CK' then 'Cook Islands'\r\nwhen 'CR' then 'Costa Rica'\r\nwhen 'CI' then 'Cote d''Ivoire'\r\nwhen 'HR' then 'Croatia'\r\nwhen 'CW' then 'Curaçao'\r\nwhen 'CY' then 'Cyprus'\r\nwhen 'CZ' then 'Czech Republic'\r\nwhen 'DK' then 'Denmark'\r\nwhen 'DJ' then 'Djibouti'\r\nwhen 'DM' then 'Dominica'\r\nwhen 'DO' then 'Dominican Republic'\r\nwhen 'EC' then 'Ecuador'\r\nwhen 'EG' then 'Egypt'\r\nwhen 'SV' then 'El Salvador'\r\nwhen 'GQ' then 'Equatorial Guinea'\r\nwhen 'ER' then 'Eritrea'\r\nwhen 'EE' then 'Estonia'\r\nwhen 'ET' then 'Ethiopia'\r\nwhen 'FK' then 'Falkland Islands (Malvinas)'\r\nwhen 'FO' then 'Faroe Islands'\r\nwhen 'FJ' then 'Fiji'\r\nwhen 'FI' then 'Finland'\r\nwhen 'FR' then 'France'\r\nwhen 'GF' then 'French Guiana'\r\nwhen 'PF' then 'French Polynesia'\r\nwhen 'TF' then 'French Southern Territories'\r\nwhen 'GA' then 'Gabon'\r\nwhen 'GM' then 'Gambia'\r\nwhen 'GE' then 'Georgia'\r\nwhen 'DE' then 'Germany'\r\nwhen 'GH' then 'Ghana'\r\nwhen 'GI' then 'Gibraltar'\r\nwhen 'GR' then 'Greece'\r\nwhen 'GL' then 'Greenland'\r\nwhen 'GD' then 'Grenada'\r\nwhen 'GP' then 'Guadeloupe'\r\nwhen 'GU' then 'Guam'\r\nwhen 'GT' then 'Guatemala'\r\nwhen 'GG' then 'Guernsey'\r\nwhen 'GN' then 'Guinea'\r\nwhen 'GW' then 'Guinea-Bissau'\r\nwhen 'GY' then 'Guyana'\r\nwhen 'HT' then 'Haiti'\r\nwhen 'HM' then 'Heard Island and McDonald Islands'\r\nwhen 'VA' then 'Holy See'\r\nwhen 'HN' then 'Honduras'\r\nwhen 'HK' then 'Hong Kong'\r\nwhen 'HU' then 'Hungary'\r\nwhen 'IS' then 'Iceland'\r\nwhen 'IN' then 'India'\r\nwhen 'ID' then 'Indonesia'\r\nwhen 'IQ' then 'Iraq'\r\nwhen 'IE' then 'Ireland'\r\nwhen 'IM' then 'Isle of Man'\r\nwhen 'IL' then 'Israel'\r\nwhen 'IT' then 'Italy'\r\nwhen 'JM' then 'Jamaica'\r\nwhen 'JP' then 'Japan'\r\nwhen 'JE' then 'Jersey'\r\nwhen 'JO' then 'Jordan'\r\nwhen 'KZ' then 'Kazakhstan'\r\nwhen 'KE' then 'Kenya'\r\nwhen 'KI' then 'Kiribati'\r\nwhen 'KR' then 'Korea, Republic of'\r\nwhen 'XK' then 'Kosovo'\r\nwhen 'KW' then 'Kuwait'\r\nwhen 'KG' then 'Kyrgyzstan'\r\nwhen 'LA' then 'Lao People''s Democratic Republic'\r\nwhen 'LV' then 'Latvia'\r\nwhen 'LB' then 'Lebanon'\r\nwhen 'LS' then 'Lesotho'\r\nwhen 'LR' then 'Liberia'\r\nwhen 'LY' then 'Libya'\r\nwhen 'LI' then 'Liechtenstein'\r\nwhen 'LT' then 'Lithuania'\r\nwhen 'LU' then 'Luxembourg'\r\nwhen 'MO' then 'Macao'\r\nwhen 'MG' then 'Madagascar'\r\nwhen 'MW' then 'Malawi'\r\nwhen 'MY' then 'Malaysia'\r\nwhen 'MV' then 'Maldives'\r\nwhen 'ML' then 'Mali'\r\nwhen 'MT' then 'Malta'\r\nwhen 'MH' then 'Marshall Islands'\r\nwhen 'MQ' then 'Martinique'\r\nwhen 'MR' then 'Mauritania'\r\nwhen 'MU' then 'Mauritius'\r\nwhen 'YT' then 'Mayotte'\r\nwhen 'MX' then 'Mexico'\r\nwhen 'FM' then 'Micronesia (Federated States of)'\r\nwhen 'MD' then 'Moldova, Republic of'\r\nwhen 'MC' then 'Monaco'\r\nwhen 'MN' then 'Mongolia'\r\nwhen 'ME' then 'Montenegro'\r\nwhen 'MS' then 'Montserrat'\r\nwhen 'MA' then 'Morocco'\r\nwhen 'MZ' then 'Mozambique'\r\nwhen 'MM' then 'Myanmar'\r\nwhen 'NA' then 'Namibia'\r\nwhen 'NR' then 'Nauru'\r\nwhen 'NP' then 'Nepal'\r\nwhen 'NL' then 'Netherlands'\r\nwhen 'NC' then 'New Caledonia'\r\nwhen 'NZ' then 'New Zealand'\r\nwhen 'NI' then 'Nicaragua'\r\nwhen 'NE' then 'Niger'\r\nwhen 'NG' then 'Nigeria'\r\nwhen 'NU' then 'Niue'\r\nwhen 'NF' then 'Norfolk Island'\r\nwhen 'MK' then 'North Macedonia'\r\nwhen 'MP' then 'Northern Mariana Islands'\r\nwhen 'NO' then 'Norway'\r\nwhen 'OM' then 'Oman'\r\nwhen 'PK' then 'Pakistan'\r\nwhen 'PW' then 'Palau'\r\nwhen 'PS' then 'Palestine'\r\nwhen 'PA' then 'Panama'\r\nwhen 'PG' then 'Papua New Guinea'\r\nwhen 'PY' then 'Paraguay'\r\nwhen 'PE' then 'Peru'\r\nwhen 'PH' then 'Philippines'\r\nwhen 'PN' then 'Pitcairn'\r\nwhen 'PL' then 'Poland'\r\nwhen 'PT' then 'Portugal'\r\nwhen 'PR' then 'Puerto Rico'\r\nwhen 'QA' then 'Qatar'\r\nwhen 'RE' then 'Reunion'\r\nwhen 'RO' then 'Romania'\r\nwhen 'RU' then 'Russian Federation'\r\nwhen 'RW' then 'Rwanda'\r\nwhen 'WS' then 'Samoa'\r\nwhen 'SM' then 'San Marino'\r\nwhen 'ST' then 'Sao Tome and Principe'\r\nwhen 'SA' then 'Saudi Arabia'\r\nwhen 'SN' then 'Senegal'\r\nwhen 'RS' then 'Serbia'\r\nwhen 'SC' then 'Seychelles'\r\nwhen 'SL' then 'Sierra Leone'\r\nwhen 'SG' then 'Singapore'\r\nwhen 'SX' then 'Sint Maarten (Dutch part)'\r\nwhen 'SK' then 'Slovakia'\r\nwhen 'SI' then 'Slovenia'\r\nwhen 'GS' then 'South Georgia and the South Sandwich Islands'\r\nwhen 'SB' then 'Solomon Islands'\r\nwhen 'SO' then 'Somalia'\r\nwhen 'ZA' then 'South Africa'\r\nwhen 'SS' then 'South Sudan'\r\nwhen 'ES' then 'Spain'\r\nwhen 'LK' then 'Sri Lanka'\r\nwhen 'BL' then 'Saint Barthélemy'\r\nwhen 'SH' then 'Saint Helena, Ascension and Tristan da Cunha'\r\nwhen 'KN' then 'Saint Kitts and Nevis'\r\nwhen 'LC' then 'Saint Lucia'\r\nwhen 'MF' then 'Saint Martin (French part)'\r\nwhen 'PM' then 'Saint Pierre and Miquelon'\r\nwhen 'VC' then 'Saint Vincent and the Grenadines'\r\nwhen 'SD' then 'Sudan'\r\nwhen 'SR' then 'Suriname'\r\nwhen 'SJ' then 'Svalbard and Jan Mayen'\r\nwhen 'SZ' then 'Eswatini'\r\nwhen 'SE' then 'Sweden'\r\nwhen 'CH' then 'Switzerland'\r\nwhen 'TW' then 'Taiwan'\r\nwhen 'TJ' then 'Tajikistan'\r\nwhen 'TZ' then 'Tanzania, United Republic of'\r\nwhen 'TH' then 'Thailand'\r\nwhen 'TL' then 'Timor-Leste'\r\nwhen 'TG' then 'Togo'\r\nwhen 'TK' then 'Tokelau'\r\nwhen 'TO' then 'Tonga'\r\nwhen 'TT' then 'Trinidad and Tobago'\r\nwhen 'TN' then 'Tunisia'\r\nwhen 'TR' then 'Turkey'\r\nwhen 'TM' then 'Turkmenistan'\r\nwhen 'TC' then 'Turks and Caicos Islands'\r\nwhen 'TV' then 'Tuvalu'\r\nwhen 'UM' then 'United States Minor Outlying Islands'\r\nwhen 'UG' then 'Uganda'\r\nwhen 'UA' then 'Ukraine'\r\nwhen 'AE' then 'United Arab Emirates'\r\nwhen 'GB' then 'United Kingdom'\r\nwhen 'US' then 'United States'\r\nwhen 'UY' then 'Uruguay'\r\nwhen 'UZ' then 'Uzbekistan'\r\nwhen 'VU' then 'Vanuatu'\r\nwhen 'VE' then 'Venezuela, Bolivarian Republic of'\r\nwhen 'VN' then 'Vietnam'\r\nwhen 'VG' then 'Virgin Islands, British'\r\nwhen 'VI' then 'Virgin Islands, U.S.'\r\nwhen 'WF' then 'Wallis and Futuna'\r\nwhen 'EH' then 'Western Sahara'\r\nwhen 'YE' then 'Yemen'\r\nwhen 'ZM' then 'Zambia'\r\nwhen 'ZW' then 'Zimbabwe'\r\nelse null\r\nend",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA9" : {
			"action" : "formula",
			"sources" : [ "FORMULA8" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "Severity_Grouping",
				"label" : "Severity_Grouping",
				"formulaExpression" : "case when Severity__c in ('1-CRITICAL-DOWN') then '1-CRITICAL-DOWN'\r\nwhen Severity__c in ('2-CRITICAL-DEGRADED') then '2-CRITICAL-DEGRADED'\r\nwhen Severity__c in ('3-NORMAL','3 - NORMAL','4-LOW PRIORITY') then '3-NORMAL'\r\nelse Severity__c end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA10" : {
			"action" : "formula",
			"sources" : [ "FORMULA9" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "Severity",
				"label" : "Severity",
				"formulaExpression" : "case ServicePortfolio when 'No Contract' then 'No Contract' else Severity_Grouping end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA11" : {
			"action" : "formula",
			"sources" : [ "FORMULA10" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "Status_Grouping",
				"label" : "Status_Grouping",
				"formulaExpression" : "case when Customer_Case_Status__c in ('Awaiting Customer Action - Provide service window','Awaiting Customer Action - Implement recommended solution','Awaiting Customer Action - Complete action plan','Awaiting Customer Action - Approve case closure','Awaiting Customer Action - Report intermittent issue') then 'Awaiting Customer Action'\r\nelse\r\nCustomer_Case_Status__c\r\nend",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA12" : {
			"action" : "formula",
			"sources" : [ "FORMULA11" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "CaseStatus",
				"label" : "Case Status",
				"formulaExpression" : "case ServicePortfolio when 'No Contract' then 'No Contract' else Status_Grouping end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA18" : {
			"action" : "computeRelative",
			"sources" : [ "FORMULA12" ],
			"parameters" : {
			  "partitionBy" : [ "Id" ],
			  "orderBy" : [ {
				"fieldName" : "Id",
				"direction" : "ASC"
			  } ],
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "NUMBER",
				"name" : "No_Of_Cases",
				"label" : "No_Of_Cases",
				"formulaExpression" : "row_number()",
				"precision" : 10,
				"scale" : 0,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA19" : {
			"action" : "formula",
			"sources" : [ "FORMULA18" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "SupportLevel",
				"label" : "Support Level",
				"formulaExpression" : "case when Service_Portfolio__c in ( 'Warranty','Standard Warranty') then 'No Contract'\r\nwhen Service_Portfolio__c in ( 'Complete Care' ,'Datacenter Care' , 'Datacenter Care Hyperscale') then 'Complete Care'\r\nwhen Service_Portfolio__c in ( 'Contract' , 'Extended Warranty') then 'Foundation Care'\r\nwhen Service_Portfolio__c in ('Legacy MC' , 'Mission Critical') then 'Mission Critical'\r\nwhen Service_Portfolio__c = 'Proactive Care' then 'Proactive Care'\r\nwhen Service_Portfolio__c = 'Proactive Care Advanced' then 'Proactive Care Advanced'\r\nwhen Service_Portfolio__c = 'Tech Care' then 'Tech care'\r\nwhen Service_Portfolio__c = 'Installation' then 'Installation'\r\nwhen Service_Portfolio__c in ( 'Proactive' ,'Manual Entitlement') then 'Other'\r\nelse 'No Contract' end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "JOIN16" : {
			"action" : "join",
			"sources" : [ "JOIN5", "FORMULA19" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ "AppendFina.Alternate_Customer_Email__c", "AppendFina.Case_Created_Days", "AppendFina.ClosedDate", "AppendFina.CreatedDate", "AppendFina.Customer_Case_Status__c", "AppendFina.Electronic_Country_Code__c", "AppendFina.Product_Number__c", "AppendFina.Service_Portfolio_Grouping", "AppendFina.Service_Portfolio__c", "AppendFina.Severity_Grouping", "AppendFina.Severity__c", "AppendFina.Status_Grouping" ]
			  }
			},
			"parameters" : {
			  "joinType" : "MULTI_VALUE_LOOKUP",
			  "leftKeys" : [ "Id" ],
			  "rightQualifier" : "AppendFina",
			  "rightKeys" : [ "AssetId" ]
			}
		  },
		  "JOIN17" : {
			"action" : "join",
			"sources" : [ "JOIN16", "FORMULA1" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LOOKUP",
			  "leftKeys" : [ "Primary_Location__c" ],
			  "rightQualifier" : "Transform1",
			  "rightKeys" : [ "Id" ]
			}
		  },
		  "FILTER1" : {
			"action" : "filter",
			"sources" : [ "LOAD_DATASET12" ],
			"parameters" : {
			  "filterExpressions" : [ {
				"type" : "TEXT",
				"field" : "Customer_Case_Status__c",
				"operator" : "NOT",
				"operands" : [ "Closed" ]
			  } ]
			}
		  },
		  "FORMULA22" : {
			"action" : "computeRelative",
			"sources" : [ "LOAD_DATASET7" ],
			"parameters" : {
			  "partitionBy" : [ "Asset__c" ],
			  "orderBy" : [ {
				"fieldName" : "Support_Level_Rank__c",
				"direction" : "ASC"
			  } ],
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "NUMBER",
				"name" : "HSL",
				"label" : "HSL",
				"formulaExpression" : "row_number()",
				"precision" : 10,
				"scale" : 0,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA23" : {
			"action" : "formula",
			"sources" : [ "FORMULA22" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "SupportEndDate",
				"label" : "SupportEndDate",
				"formulaExpression" : "date_format(End_Date__c, 'MMMM dd, yyyy')",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA24" : {
			"action" : "formula",
			"sources" : [ "FORMULA23" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "SupportLevelFinal",
				"label" : "SupportLevelFinal",
				"formulaExpression" : "case when Contract_Level__c in ( 'Warranty','Standard Warranty') then 'No Contract' else Contract_Level__c\r\nend ",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FILTER2" : {
			"action" : "filter",
			"sources" : [ "FORMULA24" ],
			"parameters" : {
			  "filterExpressions" : [ {
				"type" : "NUMBER",
				"field" : "HSL",
				"operator" : "EQUAL",
				"operands" : [ "1" ]
			  } ]
			}
		  },
		  "JOIN18" : {
			"action" : "join",
			"sources" : [ "JOIN17", "AGGREGATE5" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LEFT_OUTER",
			  "leftKeys" : [ "AccountId" ],
			  "rightQualifier" : "MyRoleData",
			  "rightKeys" : [ "Id" ]
			}
		  },
		  "FORMULA25" : {
			"action" : "formula",
			"sources" : [ "JOIN18" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "SupportLevel",
				"label" : "Support Level",
				"formulaExpression" : "case when \"AssetSuppo.End_Date__c\" is null then 'No Support' else \"AssetSuppo.SupportLevelFinal\" end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "REPLACE0" : {
			"action" : "formula",
			"sources" : [ "FORMULA25" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "Eid",
				"label" : "Eid",
				"formulaExpression" : "replace(External_Id__c, '|', '%7C')",
				"precision" : 255
			  } ]
			}
		  },
		  "FORMULA29" : {
			"action" : "formula",
			"sources" : [ "REPLACE0" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "DATETIME",
				"name" : "Timestamp",
				"label" : "Timestamp",
				"formulaExpression" : "now()",
				"format" : "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
				"defaultValue" : ""
			  } ]
			}
		  },
		  "LOAD_DATASET14" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "CEP_GroupMember__c", "Role_Name__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "CEPRoleGroupMemberRelation__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "CEPRoleGroupMemberRelation__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET15" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Contact__c", "CEP_Group__c", "Id" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "CEPGroupMember__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "CEPGroupMember__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET16" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Name", "Account__c" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "CEPGroup__c",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "CEPGroup__c"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET17" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Name" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "RecordType",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "RecordType"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET18" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "Name", "Type", "RecordTypeId" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "Account",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "Account"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "LOAD_DATASET19" : {
			"action" : "load",
			"sources" : [ ],
			"parameters" : {
			  "fields" : [ "Id", "AccountId", "ContactId", "IsDirect", "IsActive" ],
			  "dataset" : {
				"type" : "connectedDataset",
				"label" : "AccountContactRelation",
				"connectionName" : "SFDC_LOCAL",
				"sourceObjectName" : "AccountContactRelation"
			  },
			  "sampleDetails" : {
				"type" : "TopN",
				"sortBy" : [ ]
			  }
			}
		  },
		  "JOIN19" : {
			"action" : "join",
			"sources" : [ "LOAD_DATASET15", "LOAD_DATASET14" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LEFT_OUTER",
			  "leftKeys" : [ "Id" ],
			  "rightQualifier" : "CEPRoleGro",
			  "rightKeys" : [ "CEP_GroupMember__c" ]
			}
		  },
		  "JOIN20" : {
			"action" : "join",
			"sources" : [ "LOAD_DATASET16", "JOIN19" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LEFT_OUTER",
			  "leftKeys" : [ "Id" ],
			  "rightQualifier" : "Join0",
			  "rightKeys" : [ "CEP_Group__c" ]
			}
		  },
		  "DROP_FIELDS0" : {
			"action" : "schema",
			"sources" : [ "JOIN20" ],
			"parameters" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ "Id", "Join0.Id", "Join0.CEP_Group__c", "Join0.CEPRoleGro.CEP_GroupMember__c" ]
			  }
			}
		  },
		  "EXTRACT0" : {
			"action" : "extractGrains",
			"sources" : [ "DROP_FIELDS0" ],
			"parameters" : {
			  "grainExtractions" : [ ]
			}
		  },
		  "AGGREGATE1" : {
			"action" : "aggregate",
			"sources" : [ "EXTRACT0" ],
			"parameters" : {
			  "aggregations" : [ {
				"action" : "COUNT",
				"name" : "COUNT_Rows",
				"label" : "Rows"
			  } ],
			  "groupings" : [ "Account__c", "Join0.Contact__c", "Join0.CEPRoleGro.Role_Name__c", "Name" ],
			  "pivots" : [ ],
			  "nodeType" : "STANDARD"
			}
		  },
		  "JOIN21" : {
			"action" : "join",
			"sources" : [ "LOAD_DATASET18", "LOAD_DATASET17" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LOOKUP",
			  "leftKeys" : [ "RecordTypeId" ],
			  "rightQualifier" : "RecordType",
			  "rightKeys" : [ "Id" ]
			}
		  },
		  "JOIN22" : {
			"action" : "join",
			"sources" : [ "JOIN21", "LOAD_DATASET19" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LEFT_OUTER",
			  "leftKeys" : [ "Id" ],
			  "rightQualifier" : "AccountCon",
			  "rightKeys" : [ "AccountId" ]
			}
		  },
		  "DROP_FIELDS1" : {
			"action" : "schema",
			"sources" : [ "JOIN22" ],
			"parameters" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ "Type", "RecordTypeId", "RecordType.Id", "AccountCon.Id", "AccountCon.AccountId", "AccountCon.IsActive" ]
			  }
			}
		  },
		  "FORMULA26" : {
			"action" : "formula",
			"sources" : [ "DROP_FIELDS1" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "cust_role_name",
				"label" : "cust_role_name",
				"formulaExpression" : "case when \"AccountCon.IsDirect\" = 'true' then 'Admin' \r\nwhen \"RecordType.Name\" = 'DCE Customer' then 'Admin' else null end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "FORMULA27" : {
			"action" : "formula",
			"sources" : [ "FORMULA26" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "AccountNamePrivate",
				"label" : "AccountNamePrivate",
				"formulaExpression" : "Case when \"AccountCon.IsDirect\" is true then 'My Group (Private)' else Name end",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "EXTRACT1" : {
			"action" : "extractGrains",
			"sources" : [ "FORMULA27" ],
			"parameters" : {
			  "grainExtractions" : [ ]
			}
		  },
		  "AGGREGATE3" : {
			"action" : "aggregate",
			"sources" : [ "EXTRACT1" ],
			"parameters" : {
			  "aggregations" : [ {
				"action" : "COUNT",
				"name" : "COUNT_Rows",
				"label" : "Rows"
			  } ],
			  "groupings" : [ "Id", "AccountCon.ContactId", "cust_role_name", "Name", "AccountNamePrivate" ],
			  "pivots" : [ ],
			  "nodeType" : "STANDARD"
			}
		  },
		  "JOIN23" : {
			"action" : "join",
			"sources" : [ "AGGREGATE3", "AGGREGATE1" ],
			"schema" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ ]
			  }
			},
			"parameters" : {
			  "joinType" : "LEFT_OUTER",
			  "leftKeys" : [ "Id", "AccountCon.ContactId" ],
			  "rightQualifier" : "Transform3",
			  "rightKeys" : [ "Account__c", "Join0.Contact__c" ]
			}
		  },
		  "DROP_FIELDS2" : {
			"action" : "schema",
			"sources" : [ "JOIN23" ],
			"parameters" : {
			  "fields" : [ ],
			  "slice" : {
				"mode" : "DROP",
				"ignoreMissingFields" : true,
				"fields" : [ "Transform3.Account__c", "Transform3.Join0.Contact__c" ]
			  }
			}
		  },
		  "FORMULA28" : {
			"action" : "formula",
			"sources" : [ "DROP_FIELDS2" ],
			"parameters" : {
			  "expressionType" : "SQL",
			  "fields" : [ {
				"type" : "TEXT",
				"name" : "finla_role_name",
				"label" : "finla_role_name",
				"formulaExpression" : "coalesce(cust_role_name, \"Transform3.Join0.CEPRoleGro.Role_Name__c\")",
				"precision" : 255,
				"defaultValue" : ""
			  } ]
			}
		  },
		  "EXTRACT2" : {
			"action" : "extractGrains",
			"sources" : [ "FORMULA28" ],
			"parameters" : {
			  "grainExtractions" : [ ]
			}
		  },
		  "AGGREGATE5" : {
			"action" : "aggregate",
			"sources" : [ "EXTRACT2" ],
			"parameters" : {
			  "aggregations" : [ {
				"action" : "COUNT",
				"name" : "COUNT_Rows1",
				"label" : "Rows"
			  } ],
			  "groupings" : [ "Id", "Name", "AccountCon.ContactId", "finla_role_name", "AccountNamePrivate" ],
			  "pivots" : [ ],
			  "nodeType" : "STANDARD"
			}
		  },
		  "OUTPUT0" : {
			"action" : "save",
			"sources" : [ "FORMULA29" ],
			"parameters" : {
			  "fields" : [ ],
			  "dataset" : {
				"type" : "analyticsDataset",
				"label" : "DCEYourInsightsDataset",
				"name" : "DCEYourInsightsDataset",
				"rowLevelSecurityFilter" : "'MyRoleData.AccountCon.ContactId' == \"$User.ContactId\"",
				"folderName" : "DCEIncidentDashboardsApp"
			  }
			}
		  }
		},
		"ui" : {
		  "nodes" : {
			"LOAD_DATASET0" : {
			  "label" : "Asset",
			  "type" : "LOAD_DATASET",
			  "top" : 531.8,
			  "left" : 112,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET1" : {
			  "label" : "ProductSupportHierarchy__c",
			  "type" : "LOAD_DATASET",
			  "top" : 672,
			  "left" : 392,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"JOIN0" : {
			  "label" : "Asset/ProductSupport",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 532,
			  "left" : 392
			},
			"LOAD_DATASET7" : {
			  "label" : "AssetSupportLevel__c",
			  "type" : "LOAD_DATASET",
			  "top" : 952.2,
			  "left" : 672,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"JOIN5" : {
			  "label" : "Asset/ProductSupport/AER/ASL",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 532,
			  "left" : 672
			},
			"LOAD_DATASET8" : {
			  "label" : "Location__c",
			  "type" : "LOAD_DATASET",
			  "top" : 812,
			  "left" : 952,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET9" : {
			  "label" : "AssetEntitlementRelation__c",
			  "type" : "LOAD_DATASET",
			  "top" : 672,
			  "left" : 532,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"JOIN8" : {
			  "label" : "Asset/ProductSupport/AER",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 532,
			  "left" : 532
			},
			"FILTER0" : {
			  "label" : "Internal Status Filter",
			  "description" : "",
			  "type" : "FILTER",
			  "top" : 532,
			  "left" : 252
			},
			"TRANSFORM1" : {
			  "label" : "LocationTransform",
			  "description" : "",
			  "type" : "TRANSFORM",
			  "top" : 672,
			  "left" : 952,
			  "graph" : {
				"FORMULA1" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				}
			  },
			  "connectors" : [ ]
			},
			"LOAD_DATASET12" : {
			  "label" : "Case",
			  "type" : "LOAD_DATASET",
			  "top" : 952.2,
			  "left" : 812,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"TRANSFORM2" : {
			  "label" : "CaseTransform",
			  "description" : "",
			  "type" : "TRANSFORM",
			  "top" : 672.2,
			  "left" : 812,
			  "graph" : {
				"FORMULA4" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA5" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA7" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA8" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA9" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA10" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA11" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA12" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				},
				"FORMULA18" : null,
				"FORMULA19" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  }
				}
			  },
			  "connectors" : [ {
				"source" : "FORMULA4",
				"target" : "FORMULA5"
			  }, {
				"source" : "FORMULA7",
				"target" : "FORMULA8"
			  }, {
				"source" : "FORMULA8",
				"target" : "FORMULA9"
			  }, {
				"source" : "FORMULA9",
				"target" : "FORMULA10"
			  }, {
				"source" : "FORMULA11",
				"target" : "FORMULA12"
			  }, {
				"source" : "FORMULA5",
				"target" : "FORMULA7"
			  }, {
				"source" : "FORMULA12",
				"target" : "FORMULA18"
			  }, {
				"source" : "FORMULA10",
				"target" : "FORMULA11"
			  }, {
				"source" : "FORMULA18",
				"target" : "FORMULA19"
			  } ]
			},
			"JOIN16" : {
			  "label" : "Asset/ProductSupport/AER/ASL/Case",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 532.2,
			  "left" : 812
			},
			"JOIN17" : {
			  "label" : "/Case/Location",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 532,
			  "left" : 952
			},
			"FILTER1" : {
			  "label" : "CaseFilter",
			  "description" : "",
			  "type" : "FILTER",
			  "top" : 812.2,
			  "left" : 812
			},
			"TRANSFORM5" : {
			  "label" : "SupportlevelTransform",
			  "description" : "",
			  "type" : "TRANSFORM",
			  "top" : 812.2,
			  "left" : 672,
			  "graph" : {
				"FORMULA22" : {
				  "label" : "Formula"
				},
				"FORMULA23" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "SupportEndDate"
				},
				"FORMULA24" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "NoContract"
				}
			  },
			  "connectors" : [ {
				"source" : "FORMULA22",
				"target" : "FORMULA23"
			  }, {
				"source" : "FORMULA23",
				"target" : "FORMULA24"
			  } ]
			},
			"FILTER2" : {
			  "label" : "SLFilter",
			  "description" : "",
			  "type" : "FILTER",
			  "top" : 672,
			  "left" : 672
			},
			"JOIN18" : {
			  "label" : "Join 18",
			  "type" : "JOIN",
			  "top" : 532,
			  "left" : 1092
			},
			"TRANSFORM6" : {
			  "label" : "Transform 6",
			  "type" : "TRANSFORM",
			  "top" : 531.8,
			  "left" : 1232,
			  "graph" : {
				"FORMULA25" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "Formula"
				},
				"REPLACE0" : {
				  "parameters" : {
					"type" : "REPLACE_UI"
				  },
				  "label" : "Replace"
				},
				"FORMULA29" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "Formula"
				}
			  },
			  "connectors" : [ {
				"source" : "FORMULA25",
				"target" : "REPLACE0"
			  }, {
				"source" : "REPLACE0",
				"target" : "FORMULA29"
			  } ]
			},
			"LOAD_DATASET14" : {
			  "label" : "CEPRoleGroupMemberRelation__c",
			  "type" : "LOAD_DATASET",
			  "top" : 252,
			  "left" : 252,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET15" : {
			  "label" : "CEPGroupMember__c",
			  "type" : "LOAD_DATASET",
			  "top" : 112,
			  "left" : 252,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET16" : {
			  "label" : "CEPGroup__c",
			  "type" : "LOAD_DATASET",
			  "top" : 112.1,
			  "left" : 671.9,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET17" : {
			  "label" : "RecordType",
			  "type" : "LOAD_DATASET",
			  "top" : 392,
			  "left" : 532,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET18" : {
			  "label" : "Account",
			  "type" : "LOAD_DATASET",
			  "top" : 392,
			  "left" : 392,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"LOAD_DATASET19" : {
			  "label" : "AccountContactRelation",
			  "type" : "LOAD_DATASET",
			  "top" : 392,
			  "left" : 672,
			  "parameters" : {
				"sampleSize" : 2000
			  }
			},
			"JOIN19" : {
			  "label" : "Join 0",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 112,
			  "left" : 392
			},
			"JOIN20" : {
			  "label" : "Join 2",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 112,
			  "left" : 532
			},
			"TRANSFORM7" : {
			  "label" : "Transform 3",
			  "description" : "",
			  "type" : "TRANSFORM",
			  "top" : 112,
			  "left" : 812,
			  "graph" : {
				"DROP_FIELDS0" : {
				  "label" : "Drop Columns"
				}
			  },
			  "connectors" : [ ]
			},
			"AGGREGATE0" : {
			  "label" : "Aggregate 2",
			  "description" : "",
			  "type" : "AGGREGATE",
			  "top" : 112,
			  "left" : 952,
			  "graph" : {
				"EXTRACT0" : null,
				"AGGREGATE1" : null
			  },
			  "connectors" : [ {
				"source" : "EXTRACT0",
				"target" : "AGGREGATE1"
			  } ]
			},
			"JOIN21" : {
			  "label" : "Join 4",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 252,
			  "left" : 532
			},
			"JOIN22" : {
			  "label" : "Join 5",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 252,
			  "left" : 672
			},
			"TRANSFORM8" : {
			  "label" : "Transform 5",
			  "description" : "",
			  "type" : "TRANSFORM",
			  "top" : 252,
			  "left" : 812,
			  "graph" : {
				"DROP_FIELDS1" : {
				  "label" : "Drop Columns"
				},
				"FORMULA26" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "Formula"
				},
				"FORMULA27" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "Formula"
				}
			  },
			  "connectors" : [ {
				"source" : "DROP_FIELDS1",
				"target" : "FORMULA26"
			  }, {
				"source" : "FORMULA26",
				"target" : "FORMULA27"
			  } ]
			},
			"AGGREGATE2" : {
			  "label" : "Aggregate 0",
			  "description" : "",
			  "type" : "AGGREGATE",
			  "top" : 252,
			  "left" : 952,
			  "graph" : {
				"EXTRACT1" : null,
				"AGGREGATE3" : null
			  },
			  "connectors" : [ {
				"source" : "EXTRACT1",
				"target" : "AGGREGATE3"
			  } ]
			},
			"JOIN23" : {
			  "label" : "Join 6",
			  "description" : "",
			  "type" : "JOIN",
			  "top" : 252,
			  "left" : 1092
			},
			"TRANSFORM9" : {
			  "label" : "Transform 2",
			  "description" : "",
			  "type" : "TRANSFORM",
			  "top" : 252,
			  "left" : 1232,
			  "graph" : {
				"DROP_FIELDS2" : {
				  "label" : "Drop Columns"
				},
				"FORMULA28" : {
				  "parameters" : {
					"type" : "BASE_FORMULA_UI"
				  },
				  "label" : "Formula"
				}
			  },
			  "connectors" : [ {
				"source" : "DROP_FIELDS2",
				"target" : "FORMULA28"
			  } ]
			},
			"AGGREGATE4" : {
			  "label" : "Aggregate 4",
			  "type" : "AGGREGATE",
			  "top" : 252,
			  "left" : 1372,
			  "graph" : {
				"EXTRACT2" : null,
				"AGGREGATE5" : null
			  },
			  "connectors" : [ {
				"source" : "EXTRACT2",
				"target" : "AGGREGATE5"
			  } ]
			},
			"OUTPUT0" : {
			  "label" : "Output 0",
			  "type" : "OUTPUT",
			  "top" : 532,
			  "left" : 1372
			}
		  },
		  "connectors" : [ {
			"source" : "JOIN0",
			"target" : "JOIN8"
		  }, {
			"source" : "FILTER0",
			"target" : "JOIN0"
		  }, {
			"source" : "LOAD_DATASET1",
			"target" : "JOIN0"
		  }, {
			"source" : "JOIN8",
			"target" : "JOIN5"
		  }, {
			"source" : "FILTER2",
			"target" : "JOIN5"
		  }, {
			"source" : "LOAD_DATASET9",
			"target" : "JOIN8"
		  }, {
			"source" : "LOAD_DATASET0",
			"target" : "FILTER0"
		  }, {
			"source" : "LOAD_DATASET8",
			"target" : "TRANSFORM1"
		  }, {
			"source" : "FILTER1",
			"target" : "TRANSFORM2"
		  }, {
			"source" : "JOIN5",
			"target" : "JOIN16"
		  }, {
			"source" : "JOIN16",
			"target" : "JOIN17"
		  }, {
			"source" : "TRANSFORM1",
			"target" : "JOIN17"
		  }, {
			"source" : "LOAD_DATASET12",
			"target" : "FILTER1"
		  }, {
			"source" : "TRANSFORM2",
			"target" : "JOIN16"
		  }, {
			"source" : "LOAD_DATASET7",
			"target" : "TRANSFORM5"
		  }, {
			"source" : "TRANSFORM5",
			"target" : "FILTER2"
		  }, {
			"source" : "JOIN17",
			"target" : "JOIN18"
		  }, {
			"source" : "JOIN18",
			"target" : "TRANSFORM6"
		  }, {
			"source" : "LOAD_DATASET15",
			"target" : "JOIN19"
		  }, {
			"source" : "LOAD_DATASET14",
			"target" : "JOIN19"
		  }, {
			"source" : "LOAD_DATASET16",
			"target" : "JOIN20"
		  }, {
			"source" : "JOIN19",
			"target" : "JOIN20"
		  }, {
			"source" : "JOIN20",
			"target" : "TRANSFORM7"
		  }, {
			"source" : "TRANSFORM7",
			"target" : "AGGREGATE0"
		  }, {
			"source" : "LOAD_DATASET18",
			"target" : "JOIN21"
		  }, {
			"source" : "LOAD_DATASET17",
			"target" : "JOIN21"
		  }, {
			"source" : "JOIN21",
			"target" : "JOIN22"
		  }, {
			"source" : "LOAD_DATASET19",
			"target" : "JOIN22"
		  }, {
			"source" : "JOIN22",
			"target" : "TRANSFORM8"
		  }, {
			"source" : "TRANSFORM8",
			"target" : "AGGREGATE2"
		  }, {
			"source" : "AGGREGATE2",
			"target" : "JOIN23"
		  }, {
			"source" : "AGGREGATE0",
			"target" : "JOIN23"
		  }, {
			"source" : "JOIN23",
			"target" : "TRANSFORM9"
		  }, {
			"source" : "TRANSFORM9",
			"target" : "AGGREGATE4"
		  }, {
			"source" : "AGGREGATE4",
			"target" : "JOIN18"
		  }, {
			"source" : "TRANSFORM6",
			"target" : "OUTPUT0"
		  } ],
		  "hiddenColumns" : [ ]
		}
	  }
}

export { getTableData };
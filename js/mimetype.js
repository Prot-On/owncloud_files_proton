OC.MimeType = {
	charset: 'UTF-8',
	catalog: {},
	lookup: function (filename, include_charset, default_mime_type) {
		var ext, charset = this.charset;
		
		if (include_charset === undefined) {
			include_charset = false;
		}
		
		if (typeof include_charset === "string") {
			charset = include_charset;
			include_charset = true;
		}

		if (filename.lastIndexOf('.') > 0) {
			ext = filename.substr(filename.lastIndexOf('.')).toLowerCase();
		} else {
			ext = filename;
		}
		
		// No extension
		if (ext === "") {
			ext = filename;
		}

		if (this.catalog[ext] !== undefined) {
			if (include_charset === true &&
					this.catalog[ext].indexOf('text/') === 0 &&
					this.catalog[ext].indexOf('charset') < 0) {
				return this.catalog[ext] + '; charset=' + charset;
			} else {
				return this.catalog[ext];
			}
		} else if (default_mime_type !== undefined) {
			if (include_charset === true &&
					default_mime_type.indexOf('text/') === 0) {
				return default_mime_type + '; charset=' + charset;
			}
			return default_mime_type;
		}
		return false;
	},
	set: function (exts, mime_type_string) {
		var result = true, self = this;
		//console.log("DEBUG exts.indexOf(',')", typeof exts.indexOf(','), exts.indexOf(','));
		if (exts.indexOf(',') > -1) {
			exts.split(',').forEach(function (ext) {
				ext = ext.trim();
				self.catalog[ext] = mime_type_string;
				if (self.catalog[ext] !== mime_type_string) {
					result = false;
				}
			});
		} else {
			self.catalog[exts] = mime_type_string;
		}
		return result;
	},
	del: function (ext) {
		delete this.catalog[ext];
		return (this.catalog[ext] === undefined);
	},
	forEach: function (callback) {
		var self = this, ext;
		// Mongo 2.2. Shell doesn't support Object.keys()
		for (ext in self.catalog) {
			if (self.catalog.hasOwnProperty(ext)) {
				callback(ext, self.catalog[ext]);
			}
		}
		return self.catalog;
	}
};

// From Apache project's mime type list.
OC.MimeType.set(".ez", "application/andrew-inset");
OC.MimeType.set(".aw", "application/applixware");
OC.MimeType.set(".atom", "application/atom+xml");
OC.MimeType.set(".atomcat", "application/atomcat+xml");
OC.MimeType.set(".atomsvc", "application/atomsvc+xml");
OC.MimeType.set(".ccxml", "application/ccxml+xml");
OC.MimeType.set(".cu", "application/cu-seeme");
OC.MimeType.set(".davmount", "application/davmount+xml");
OC.MimeType.set(".ecma", "application/ecmascript");
OC.MimeType.set(".emma", "application/emma+xml");
OC.MimeType.set(".epub", "application/epub+zip");
OC.MimeType.set(".pfr", "application/font-tdpfr");
OC.MimeType.set(".stk", "application/hyperstudio");
OC.MimeType.set(".jar", "application/java-archive");
OC.MimeType.set(".ser", "application/java-serialized-object");
OC.MimeType.set(".class", "application/java-vm");
OC.MimeType.set(".js", "application/javascript");
OC.MimeType.set(".json", "application/json");
OC.MimeType.set(".lostxml", "application/lost+xml");
OC.MimeType.set(".hqx", "application/mac-binhex40");
OC.MimeType.set(".cpt", "application/mac-compactpro");
OC.MimeType.set(".mrc", "application/marc");
OC.MimeType.set(".ma,.nb,.mb", "application/mathematica");
OC.MimeType.set(".mathml", "application/mathml+xml");
OC.MimeType.set(".mbox", "application/mbox");
OC.MimeType.set(".mscml", "application/mediaservercontrol+xml");
OC.MimeType.set(".mp4s", "application/mp4");
OC.MimeType.set(".doc,.dot", "application/msword");
OC.MimeType.set(".mxf", "application/mxf");
OC.MimeType.set(".oda", "application/oda");
OC.MimeType.set(".opf", "application/oebps-package+xml");
OC.MimeType.set(".ogx", "application/ogg");
OC.MimeType.set(".onetoc,.onetoc2,.onetmp,.onepkg", "application/onenote");
OC.MimeType.set(".xer", "application/patch-ops-error+xml");
OC.MimeType.set(".pdf", "application/pdf");
OC.MimeType.set(".pgp", "application/pgp-encrypted");
OC.MimeType.set(".asc,.sig", "application/pgp-signature");
OC.MimeType.set(".prf", "application/pics-rules");
OC.MimeType.set(".p10", "application/pkcs10");
OC.MimeType.set(".p7m,.p7c", "application/pkcs7-mime");
OC.MimeType.set(".p7s", "application/pkcs7-signature");
OC.MimeType.set(".cer", "application/pkix-cert");
OC.MimeType.set(".crl", "application/pkix-crl");
OC.MimeType.set(".pkipath", "application/pkix-pkipath");
OC.MimeType.set(".pki", "application/pkixcmp");
OC.MimeType.set(".pls", "application/pls+xml");
OC.MimeType.set(".ai,.eps,.ps", "application/postscript");
OC.MimeType.set(".cww", "application/prs.cww");
OC.MimeType.set(".rdf", "application/rdf+xml");
OC.MimeType.set(".rif", "application/reginfo+xml");
OC.MimeType.set(".rnc", "application/relax-ng-compact-syntax");
OC.MimeType.set(".rl", "application/resource-lists+xml");
OC.MimeType.set(".rld", "application/resource-lists-diff+xml");
OC.MimeType.set(".rs", "application/rls-services+xml");
OC.MimeType.set(".rsd", "application/rsd+xml");
OC.MimeType.set(".rss", "application/rss+xml");
OC.MimeType.set(".rtf", "application/rtf");
OC.MimeType.set(".sbml", "application/sbml+xml");
OC.MimeType.set(".scq", "application/scvp-cv-request");
OC.MimeType.set(".scs", "application/scvp-cv-response");
OC.MimeType.set(".spq", "application/scvp-vp-request");
OC.MimeType.set(".spp", "application/scvp-vp-response");
OC.MimeType.set(".sdp", "application/sdp");
OC.MimeType.set(".setpay", "application/set-payment-initiation");
OC.MimeType.set(".setreg", "application/set-registration-initiation");
OC.MimeType.set(".shf", "application/shf+xml");
OC.MimeType.set(".smi,.smil", "application/smil+xml");
OC.MimeType.set(".rq", "application/sparql-query");
OC.MimeType.set(".srx", "application/sparql-results+xml");
OC.MimeType.set(".gram", "application/srgs");
OC.MimeType.set(".grxml", "application/srgs+xml");
OC.MimeType.set(".ssml", "application/ssml+xml");
OC.MimeType.set(".plb", "application/vnd.3gpp.pic-bw-large");
OC.MimeType.set(".psb", "application/vnd.3gpp.pic-bw-small");
OC.MimeType.set(".pvb", "application/vnd.3gpp.pic-bw-var");
OC.MimeType.set(".tcap", "application/vnd.3gpp2.tcap");
OC.MimeType.set(".pwn", "application/vnd.3m.post-it-notes");
OC.MimeType.set(".aso", "application/vnd.accpac.simply.aso");
OC.MimeType.set(".imp", "application/vnd.accpac.simply.imp");
OC.MimeType.set(".acu", "application/vnd.acucobol");
OC.MimeType.set(".atc,.acutc", "application/vnd.acucorp");
OC.MimeType.set(".air", "application/vnd.adobe.air-application-installer-package+zip");
OC.MimeType.set(".xdp", "application/vnd.adobe.xdp+xml");
OC.MimeType.set(".xfdf", "application/vnd.adobe.xfdf");
OC.MimeType.set(".azf", "application/vnd.airzip.filesecure.azf");
OC.MimeType.set(".azs", "application/vnd.airzip.filesecure.azs");
OC.MimeType.set(".azw", "application/vnd.amazon.ebook");
OC.MimeType.set(".acc", "application/vnd.americandynamics.acc");
OC.MimeType.set(".ami", "application/vnd.amiga.ami");
OC.MimeType.set(".apk", "application/vnd.android.package-archive");
OC.MimeType.set(".cii", "application/vnd.anser-web-certificate-issue-initiation");
OC.MimeType.set(".fti", "application/vnd.anser-web-funds-transfer-initiation");
OC.MimeType.set(".atx", "application/vnd.antix.game-component");
OC.MimeType.set(".mpkg", "application/vnd.apple.installer+xml");
OC.MimeType.set(".swi", "application/vnd.arastra.swi");
OC.MimeType.set(".aep", "application/vnd.audiograph");
OC.MimeType.set(".mpm", "application/vnd.blueice.multipass");
OC.MimeType.set(".bmi", "application/vnd.bmi");
OC.MimeType.set(".rep", "application/vnd.businessobjects");
OC.MimeType.set(".cdxml", "application/vnd.chemdraw+xml");
OC.MimeType.set(".mmd", "application/vnd.chipnuts.karaoke-mmd");
OC.MimeType.set(".cdy", "application/vnd.cinderella");
OC.MimeType.set(".cla", "application/vnd.claymore");
OC.MimeType.set(".c4g,.c4d,.c4f,.c4p,.c4u", "application/vnd.clonk.c4group");
OC.MimeType.set(".csp", "application/vnd.commonspace");
OC.MimeType.set(".cdbcmsg", "application/vnd.contact.cmsg");
OC.MimeType.set(".cmc", "application/vnd.cosmocaller");
OC.MimeType.set(".clkx", "application/vnd.crick.clicker");
OC.MimeType.set(".clkk", "application/vnd.crick.clicker.keyboard");
OC.MimeType.set(".clkp", "application/vnd.crick.clicker.palette");
OC.MimeType.set(".clkt", "application/vnd.crick.clicker.template");
OC.MimeType.set(".clkw", "application/vnd.crick.clicker.wordbank");
OC.MimeType.set(".wbs", "application/vnd.criticaltools.wbs+xml");
OC.MimeType.set(".pml", "application/vnd.ctc-posml");
OC.MimeType.set(".ppd", "application/vnd.cups-ppd");
OC.MimeType.set(".car", "application/vnd.curl.car");
OC.MimeType.set(".pcurl", "application/vnd.curl.pcurl");
OC.MimeType.set(".rdz", "application/vnd.data-vision.rdz");
OC.MimeType.set(".fe_launch", "application/vnd.denovo.fcselayout-link");
OC.MimeType.set(".dna", "application/vnd.dna");
OC.MimeType.set(".mlp", "application/vnd.dolby.mlp");
OC.MimeType.set(".dpg", "application/vnd.dpgraph");
OC.MimeType.set(".dfac", "application/vnd.dreamfactory");
OC.MimeType.set(".geo", "application/vnd.dynageo");
OC.MimeType.set(".mag", "application/vnd.ecowin.chart");
OC.MimeType.set(".nml", "application/vnd.enliven");
OC.MimeType.set(".esf", "application/vnd.epson.esf");
OC.MimeType.set(".msf", "application/vnd.epson.msf");
OC.MimeType.set(".qam", "application/vnd.epson.quickanime");
OC.MimeType.set(".slt", "application/vnd.epson.salt");
OC.MimeType.set(".ssf", "application/vnd.epson.ssf");
OC.MimeType.set(".es3,.et3", "application/vnd.eszigno3+xml");
OC.MimeType.set(".ez2", "application/vnd.ezpix-album");
OC.MimeType.set(".ez3", "application/vnd.ezpix-package");
OC.MimeType.set(".fdf", "application/vnd.fdf");
OC.MimeType.set(".mseed", "application/vnd.fdsn.mseed");
OC.MimeType.set(".seed,.dataless", "application/vnd.fdsn.seed");
OC.MimeType.set(".gph", "application/vnd.flographit");
OC.MimeType.set(".ftc", "application/vnd.fluxtime.clip");
OC.MimeType.set(".fm,.frame,.maker,.book", "application/vnd.framemaker");
OC.MimeType.set(".fnc", "application/vnd.frogans.fnc");
OC.MimeType.set(".ltf", "application/vnd.frogans.ltf");
OC.MimeType.set(".fsc", "application/vnd.fsc.weblaunch");
OC.MimeType.set(".oas", "application/vnd.fujitsu.oasys");
OC.MimeType.set(".oa2", "application/vnd.fujitsu.oasys2");
OC.MimeType.set(".oa3", "application/vnd.fujitsu.oasys3");
OC.MimeType.set(".fg5", "application/vnd.fujitsu.oasysgp");
OC.MimeType.set(".bh2", "application/vnd.fujitsu.oasysprs");
OC.MimeType.set(".ddd", "application/vnd.fujixerox.ddd");
OC.MimeType.set(".xdw", "application/vnd.fujixerox.docuworks");
OC.MimeType.set(".xbd", "application/vnd.fujixerox.docuworks.binder");
OC.MimeType.set(".fzs", "application/vnd.fuzzysheet");
OC.MimeType.set(".txd", "application/vnd.genomatix.tuxedo");
OC.MimeType.set(".ggb", "application/vnd.geogebra.file");
OC.MimeType.set(".ggt", "application/vnd.geogebra.tool");
OC.MimeType.set(".gex,.gre", "application/vnd.geometry-explorer");
OC.MimeType.set(".gmx", "application/vnd.gmx");
OC.MimeType.set(".kml", "application/vnd.google-earth.kml+xml");
OC.MimeType.set(".kmz", "application/vnd.google-earth.kmz");
OC.MimeType.set(".gqf,.gqs", "application/vnd.grafeq");
OC.MimeType.set(".gac", "application/vnd.groove-account");
OC.MimeType.set(".ghf", "application/vnd.groove-help");
OC.MimeType.set(".gim", "application/vnd.groove-identity-message");
OC.MimeType.set(".grv", "application/vnd.groove-injector");
OC.MimeType.set(".gtm", "application/vnd.groove-tool-message");
OC.MimeType.set(".tpl", "application/vnd.groove-tool-template");
OC.MimeType.set(".vcg", "application/vnd.groove-vcard");
OC.MimeType.set(".zmm", "application/vnd.handheld-entertainment+xml");
OC.MimeType.set(".hbci", "application/vnd.hbci");
OC.MimeType.set(".les", "application/vnd.hhe.lesson-player");
OC.MimeType.set(".hpgl", "application/vnd.hp-hpgl");
OC.MimeType.set(".hpid", "application/vnd.hp-hpid");
OC.MimeType.set(".hps", "application/vnd.hp-hps");
OC.MimeType.set(".jlt", "application/vnd.hp-jlyt");
OC.MimeType.set(".pcl", "application/vnd.hp-pcl");
OC.MimeType.set(".pclxl", "application/vnd.hp-pclxl");
OC.MimeType.set(".sfd-hdstx", "application/vnd.hydrostatix.sof-data");
OC.MimeType.set(".x3d", "application/vnd.hzn-3d-crossword");
OC.MimeType.set(".mpy", "application/vnd.ibm.minipay");
OC.MimeType.set(".afp,.listafp,.list3820", "application/vnd.ibm.modcap");
OC.MimeType.set(".irm", "application/vnd.ibm.rights-management");
OC.MimeType.set(".sc", "application/vnd.ibm.secure-container");
OC.MimeType.set(".icc,.icm", "application/vnd.iccprofile");
OC.MimeType.set(".igl", "application/vnd.igloader");
OC.MimeType.set(".ivp", "application/vnd.immervision-ivp");
OC.MimeType.set(".ivu", "application/vnd.immervision-ivu");
OC.MimeType.set(".xpw,.xpx", "application/vnd.intercon.formnet");
OC.MimeType.set(".qbo", "application/vnd.intu.qbo");
OC.MimeType.set(".qfx", "application/vnd.intu.qfx");
OC.MimeType.set(".rcprofile", "application/vnd.ipunplugged.rcprofile");
OC.MimeType.set(".irp", "application/vnd.irepository.package+xml");
OC.MimeType.set(".xpr", "application/vnd.is-xpr");
OC.MimeType.set(".jam", "application/vnd.jam");
OC.MimeType.set(".rms", "application/vnd.jcp.javame.midlet-rms");
OC.MimeType.set(".jisp", "application/vnd.jisp");
OC.MimeType.set(".joda", "application/vnd.joost.joda-archive");
OC.MimeType.set(".ktz,.ktr", "application/vnd.kahootz");
OC.MimeType.set(".karbon", "application/vnd.kde.karbon");
OC.MimeType.set(".chrt", "application/vnd.kde.kchart");
OC.MimeType.set(".kfo", "application/vnd.kde.kformula");
OC.MimeType.set(".flw", "application/vnd.kde.kivio");
OC.MimeType.set(".kon", "application/vnd.kde.kontour");
OC.MimeType.set(".kpr,.kpt", "application/vnd.kde.kpresenter");
OC.MimeType.set(".ksp", "application/vnd.kde.kspread");
OC.MimeType.set(".kwd,.kwt", "application/vnd.kde.kword");
OC.MimeType.set(".htke", "application/vnd.kenameaapp");
OC.MimeType.set(".kia", "application/vnd.kidspiration");
OC.MimeType.set(".kne,.knp", "application/vnd.kinar");
OC.MimeType.set(".skp,.skd,.skt,.skm", "application/vnd.koan");
OC.MimeType.set(".sse", "application/vnd.kodak-descriptor");
OC.MimeType.set(".lbd", "application/vnd.llamagraphics.life-balance.desktop");
OC.MimeType.set(".lbe", "application/vnd.llamagraphics.life-balance.exchange+xml");
OC.MimeType.set(".123", "application/vnd.lotus-1-2-3");
OC.MimeType.set(".apr", "application/vnd.lotus-approach");
OC.MimeType.set(".pre", "application/vnd.lotus-freelance");
OC.MimeType.set(".nsf", "application/vnd.lotus-notes");
OC.MimeType.set(".org", "application/vnd.lotus-organizer");
OC.MimeType.set(".scm", "application/vnd.lotus-screencam");
OC.MimeType.set(".lwp", "application/vnd.lotus-wordpro");
OC.MimeType.set(".portpkg", "application/vnd.macports.portpkg");
OC.MimeType.set(".mcd", "application/vnd.mcd");
OC.MimeType.set(".mc1", "application/vnd.medcalcdata");
OC.MimeType.set(".cdkey", "application/vnd.mediastation.cdkey");
OC.MimeType.set(".mwf", "application/vnd.mfer");
OC.MimeType.set(".mfm", "application/vnd.mfmp");
OC.MimeType.set(".flo", "application/vnd.micrografx.flo");
OC.MimeType.set(".igx", "application/vnd.micrografx.igx");
OC.MimeType.set(".mif", "application/vnd.mif");
OC.MimeType.set(".daf", "application/vnd.mobius.daf");
OC.MimeType.set(".dis", "application/vnd.mobius.dis");
OC.MimeType.set(".mbk", "application/vnd.mobius.mbk");
OC.MimeType.set(".mqy", "application/vnd.mobius.mqy");
OC.MimeType.set(".msl", "application/vnd.mobius.msl");
OC.MimeType.set(".plc", "application/vnd.mobius.plc");
OC.MimeType.set(".txf", "application/vnd.mobius.txf");
OC.MimeType.set(".mpn", "application/vnd.mophun.application");
OC.MimeType.set(".mpc", "application/vnd.mophun.certificate");
OC.MimeType.set(".xul", "application/vnd.mozilla.xul+xml");
OC.MimeType.set(".cil", "application/vnd.ms-artgalry");
OC.MimeType.set(".cab", "application/vnd.ms-cab-compressed");
OC.MimeType.set(".xls,.xlm,.xla,.xlc,.xlt,.xlw", "application/vnd.ms-excel");
OC.MimeType.set(".xlam", "application/vnd.ms-excel.addin.macroenabled.12");
OC.MimeType.set(".xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12");
OC.MimeType.set(".xlsm", "application/vnd.ms-excel.sheet.macroenabled.12");
OC.MimeType.set(".xltm", "application/vnd.ms-excel.template.macroenabled.12");
OC.MimeType.set(".eot", "application/vnd.ms-fontobject");
OC.MimeType.set(".chm", "application/vnd.ms-htmlhelp");
OC.MimeType.set(".ims", "application/vnd.ms-ims");
OC.MimeType.set(".lrm", "application/vnd.ms-lrm");
OC.MimeType.set(".cat", "application/vnd.ms-pki.seccat");
OC.MimeType.set(".stl", "application/vnd.ms-pki.stl");
OC.MimeType.set(".ppt,.pps,.pot", "application/vnd.ms-powerpoint");
OC.MimeType.set(".ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12");
OC.MimeType.set(".pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12");
OC.MimeType.set(".sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12");
OC.MimeType.set(".ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12");
OC.MimeType.set(".potm", "application/vnd.ms-powerpoint.template.macroenabled.12");
OC.MimeType.set(".mpp,.mpt", "application/vnd.ms-project");
OC.MimeType.set(".docm", "application/vnd.ms-word.document.macroenabled.12");
OC.MimeType.set(".dotm", "application/vnd.ms-word.template.macroenabled.12");
OC.MimeType.set(".wps,.wks,.wcm,.wdb", "application/vnd.ms-works");
OC.MimeType.set(".wpl", "application/vnd.ms-wpl");
OC.MimeType.set(".xps", "application/vnd.ms-xpsdocument");
OC.MimeType.set(".mseq", "application/vnd.mseq");
OC.MimeType.set(".mus", "application/vnd.musician");
OC.MimeType.set(".msty", "application/vnd.muvee.style");
OC.MimeType.set(".nlu", "application/vnd.neurolanguage.nlu");
OC.MimeType.set(".nnd", "application/vnd.noblenet-directory");
OC.MimeType.set(".nns", "application/vnd.noblenet-sealer");
OC.MimeType.set(".nnw", "application/vnd.noblenet-web");
OC.MimeType.set(".ngdat", "application/vnd.nokia.n-gage.data");
OC.MimeType.set(".n-gage", "application/vnd.nokia.n-gage.symbian.install");
OC.MimeType.set(".rpst", "application/vnd.nokia.radio-preset");
OC.MimeType.set(".rpss", "application/vnd.nokia.radio-presets");
OC.MimeType.set(".edm", "application/vnd.novadigm.edm");
OC.MimeType.set(".edx", "application/vnd.novadigm.edx");
OC.MimeType.set(".ext", "application/vnd.novadigm.ext");
OC.MimeType.set(".odc", "application/vnd.oasis.opendocument.chart");
OC.MimeType.set(".otc", "application/vnd.oasis.opendocument.chart-template");
OC.MimeType.set(".odb", "application/vnd.oasis.opendocument.database");
OC.MimeType.set(".odf", "application/vnd.oasis.opendocument.formula");
OC.MimeType.set(".odft", "application/vnd.oasis.opendocument.formula-template");
OC.MimeType.set(".odg", "application/vnd.oasis.opendocument.graphics");
OC.MimeType.set(".otg", "application/vnd.oasis.opendocument.graphics-template");
OC.MimeType.set(".odi", "application/vnd.oasis.opendocument.image");
OC.MimeType.set(".oti", "application/vnd.oasis.opendocument.image-template");
OC.MimeType.set(".odp", "application/vnd.oasis.opendocument.presentation");
OC.MimeType.set(".ods", "application/vnd.oasis.opendocument.spreadsheet");
OC.MimeType.set(".ots", "application/vnd.oasis.opendocument.spreadsheet-template");
OC.MimeType.set(".odt", "application/vnd.oasis.opendocument.text");
OC.MimeType.set(".otm", "application/vnd.oasis.opendocument.text-master");
OC.MimeType.set(".ott", "application/vnd.oasis.opendocument.text-template");
OC.MimeType.set(".oth", "application/vnd.oasis.opendocument.text-web");
OC.MimeType.set(".xo", "application/vnd.olpc-sugar");
OC.MimeType.set(".dd2", "application/vnd.oma.dd2+xml");
OC.MimeType.set(".oxt", "application/vnd.openofficeorg.extension");
OC.MimeType.set(".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
OC.MimeType.set(".sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide");
OC.MimeType.set(".ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow");
OC.MimeType.set(".potx", "application/vnd.openxmlformats-officedocument.presentationml.template");
OC.MimeType.set(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
OC.MimeType.set(".xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template");
OC.MimeType.set(".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
OC.MimeType.set(".dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template");
OC.MimeType.set(".dp", "application/vnd.osgi.dp");
OC.MimeType.set(".pdb,.pqa,.oprc", "application/vnd.palm");
OC.MimeType.set(".str", "application/vnd.pg.format");
OC.MimeType.set(".ei6", "application/vnd.pg.osasli");
OC.MimeType.set(".efif", "application/vnd.picsel");
OC.MimeType.set(".plf", "application/vnd.pocketlearn");
OC.MimeType.set(".pbd", "application/vnd.powerbuilder6");
OC.MimeType.set(".box", "application/vnd.previewsystems.box");
OC.MimeType.set(".mgz", "application/vnd.proteus.magazine");
OC.MimeType.set(".qps", "application/vnd.publishare-delta-tree");
OC.MimeType.set(".ptid", "application/vnd.pvi.ptid1");
OC.MimeType.set(".qxd,.qxt,.qwd,.qwt,.qxl,.qxb", "application/vnd.quark.quarkxpress");
OC.MimeType.set(".mxl", "application/vnd.recordare.musicxml");
OC.MimeType.set(".musicxml", "application/vnd.recordare.musicxml+xml");
OC.MimeType.set(".cod", "application/vnd.rim.cod");
OC.MimeType.set(".rm", "application/vnd.rn-realmedia");
OC.MimeType.set(".link66", "application/vnd.route66.link66+xml");
OC.MimeType.set(".see", "application/vnd.seemail");
OC.MimeType.set(".sema", "application/vnd.sema");
OC.MimeType.set(".semd", "application/vnd.semd");
OC.MimeType.set(".semf", "application/vnd.semf");
OC.MimeType.set(".ifm", "application/vnd.shana.informed.formdata");
OC.MimeType.set(".itp", "application/vnd.shana.informed.formtemplate");
OC.MimeType.set(".iif", "application/vnd.shana.informed.interchange");
OC.MimeType.set(".ipk", "application/vnd.shana.informed.package");
OC.MimeType.set(".twd,.twds", "application/vnd.simtech-mindmapper");
OC.MimeType.set(".mmf", "application/vnd.smaf");
OC.MimeType.set(".teacher", "application/vnd.smart.teacher");
OC.MimeType.set(".sdkm,.sdkd", "application/vnd.solent.sdkm+xml");
OC.MimeType.set(".dxp", "application/vnd.spotfire.dxp");
OC.MimeType.set(".sfs", "application/vnd.spotfire.sfs");
OC.MimeType.set(".sdc", "application/vnd.stardivision.calc");
OC.MimeType.set(".sda", "application/vnd.stardivision.draw");
OC.MimeType.set(".sdd", "application/vnd.stardivision.impress");
OC.MimeType.set(".smf", "application/vnd.stardivision.math");
OC.MimeType.set(".sdw", "application/vnd.stardivision.writer");
OC.MimeType.set(".vor", "application/vnd.stardivision.writer");
OC.MimeType.set(".sgl", "application/vnd.stardivision.writer-global");
OC.MimeType.set(".sxc", "application/vnd.sun.xml.calc");
OC.MimeType.set(".stc", "application/vnd.sun.xml.calc.template");
OC.MimeType.set(".sxd", "application/vnd.sun.xml.draw");
OC.MimeType.set(".std", "application/vnd.sun.xml.draw.template");
OC.MimeType.set(".sxi", "application/vnd.sun.xml.impress");
OC.MimeType.set(".sti", "application/vnd.sun.xml.impress.template");
OC.MimeType.set(".sxm", "application/vnd.sun.xml.math");
OC.MimeType.set(".sxw", "application/vnd.sun.xml.writer");
OC.MimeType.set(".sxg", "application/vnd.sun.xml.writer.global");
OC.MimeType.set(".stw", "application/vnd.sun.xml.writer.template");
OC.MimeType.set(".sus,.susp", "application/vnd.sus-calendar");
OC.MimeType.set(".svd", "application/vnd.svd");
OC.MimeType.set(".sis,.sisx", "application/vnd.symbian.install");
OC.MimeType.set(".xsm", "application/vnd.syncml+xml");
OC.MimeType.set(".bdm", "application/vnd.syncml.dm+wbxml");
OC.MimeType.set(".xdm", "application/vnd.syncml.dm+xml");
OC.MimeType.set(".tao", "application/vnd.tao.intent-module-archive");
OC.MimeType.set(".tmo", "application/vnd.tmobile-livetv");
OC.MimeType.set(".tpt", "application/vnd.trid.tpt");
OC.MimeType.set(".mxs", "application/vnd.triscape.mxs");
OC.MimeType.set(".tra", "application/vnd.trueapp");
OC.MimeType.set(".ufd,.ufdl", "application/vnd.ufdl");
OC.MimeType.set(".utz", "application/vnd.uiq.theme");
OC.MimeType.set(".umj", "application/vnd.umajin");
OC.MimeType.set(".unityweb", "application/vnd.unity");
OC.MimeType.set(".uoml", "application/vnd.uoml+xml");
OC.MimeType.set(".vcx", "application/vnd.vcx");
OC.MimeType.set(".vsd,.vst,.vss,.vsw", "application/vnd.visio");
OC.MimeType.set(".vis", "application/vnd.visionary");
OC.MimeType.set(".vsf", "application/vnd.vsf");
OC.MimeType.set(".wbxml", "application/vnd.wap.wbxml");
OC.MimeType.set(".wmlc", "application/vnd.wap.wmlc");
OC.MimeType.set(".wmlsc", "application/vnd.wap.wmlscriptc");
OC.MimeType.set(".wtb", "application/vnd.webturbo");
OC.MimeType.set(".wpd", "application/vnd.wordperfect");
OC.MimeType.set(".wqd", "application/vnd.wqd");
OC.MimeType.set(".stf", "application/vnd.wt.stf");
OC.MimeType.set(".xar", "application/vnd.xara");
OC.MimeType.set(".xfdl", "application/vnd.xfdl");
OC.MimeType.set(".hvd", "application/vnd.yamaha.hv-dic");
OC.MimeType.set(".hvs", "application/vnd.yamaha.hv-script");
OC.MimeType.set(".hvp", "application/vnd.yamaha.hv-voice");
OC.MimeType.set(".osf", "application/vnd.yamaha.openscoreformat");
OC.MimeType.set(".osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml");
OC.MimeType.set(".saf", "application/vnd.yamaha.smaf-audio");
OC.MimeType.set(".spf", "application/vnd.yamaha.smaf-phrase");
OC.MimeType.set(".cmp", "application/vnd.yellowriver-custom-menu");
OC.MimeType.set(".zir,.zirz", "application/vnd.zul");
OC.MimeType.set(".zaz", "application/vnd.zzazz.deck+xml");
OC.MimeType.set(".vxml", "application/voicexml+xml");
OC.MimeType.set(".hlp", "application/winhlp");
OC.MimeType.set(".wsdl", "application/wsdl+xml");
OC.MimeType.set(".wspolicy", "application/wspolicy+xml");
OC.MimeType.set(".abw", "application/x-abiword");
OC.MimeType.set(".ace", "application/x-ace-compressed");
OC.MimeType.set(".aab,.x32,.u32,.vox", "application/x-authorware-bin");
OC.MimeType.set(".aam", "application/x-authorware-map");
OC.MimeType.set(".aas", "application/x-authorware-seg");
OC.MimeType.set(".bcpio", "application/x-bcpio");
OC.MimeType.set(".torrent", "application/x-bittorrent");
OC.MimeType.set(".bz", "application/x-bzip");
OC.MimeType.set(".bz2,.boz", "application/x-bzip2");
OC.MimeType.set(".vcd", "application/x-cdlink");
OC.MimeType.set(".chat", "application/x-chat");
OC.MimeType.set(".pgn", "application/x-chess-pgn");
OC.MimeType.set(".cpio", "application/x-cpio");
OC.MimeType.set(".csh", "application/x-csh");
OC.MimeType.set(".deb,.udeb", "application/x-debian-package");
OC.MimeType.set(".dir,.dcr,.dxr,.cst,.cct,.cxt,.w3d,.fgd,.swa", "application/x-director");
OC.MimeType.set(".wad", "application/x-doom");
OC.MimeType.set(".ncx", "application/x-dtbncx+xml");
OC.MimeType.set(".dtb", "application/x-dtbook+xml");
OC.MimeType.set(".res", "application/x-dtbresource+xml");
OC.MimeType.set(".dvi", "application/x-dvi");
OC.MimeType.set(".bdf", "application/x-font-bdf");
OC.MimeType.set(".gsf", "application/x-font-ghostscript");
OC.MimeType.set(".psf", "application/x-font-linux-psf");
OC.MimeType.set(".otf", "application/x-font-otf");
OC.MimeType.set(".pcf", "application/x-font-pcf");
OC.MimeType.set(".snf", "application/x-font-snf");
OC.MimeType.set(".ttf,.ttc", "application/x-font-ttf");
OC.MimeType.set(".woff", "application/font-woff");
OC.MimeType.set(".pfa,.pfb,.pfm,.afm", "application/x-font-type1");
OC.MimeType.set(".spl", "application/x-futuresplash");
OC.MimeType.set(".gnumeric", "application/x-gnumeric");
OC.MimeType.set(".gtar", "application/x-gtar");
OC.MimeType.set(".hdf", "application/x-hdf");
OC.MimeType.set(".jnlp", "application/x-java-jnlp-file");
OC.MimeType.set(".latex", "application/x-latex");
OC.MimeType.set(".prc,.mobi", "application/x-mobipocket-ebook");
OC.MimeType.set(".application", "application/x-ms-application");
OC.MimeType.set(".wmd", "application/x-ms-wmd");
OC.MimeType.set(".wmz", "application/x-ms-wmz");
OC.MimeType.set(".xbap", "application/x-ms-xbap");
OC.MimeType.set(".mdb", "application/x-msaccess");
OC.MimeType.set(".obd", "application/x-msbinder");
OC.MimeType.set(".crd", "application/x-mscardfile");
OC.MimeType.set(".clp", "application/x-msclip");
OC.MimeType.set(".exe,.dll,.com,.bat,.msi", "application/x-msdownload");
OC.MimeType.set(".mvb,.m13,.m14", "application/x-msmediaview");
OC.MimeType.set(".wmf", "application/x-msmetafile");
OC.MimeType.set(".mny", "application/x-msmoney");
OC.MimeType.set(".pub", "application/x-mspublisher");
OC.MimeType.set(".scd", "application/x-msschedule");
OC.MimeType.set(".trm", "application/x-msterminal");
OC.MimeType.set(".wri", "application/x-mswrite");
OC.MimeType.set(".nc,.cdf", "application/x-netcdf");
OC.MimeType.set(".p12,.pfx", "application/x-pkcs12");
OC.MimeType.set(".p7b,.spc", "application/x-pkcs7-certificates");
OC.MimeType.set(".p7r", "application/x-pkcs7-certreqresp");
OC.MimeType.set(".rar", "application/x-rar-compressed");
OC.MimeType.set(".sh", "application/x-sh");
OC.MimeType.set(".shar", "application/x-shar");
OC.MimeType.set(".swf", "application/x-shockwave-flash");
OC.MimeType.set(".xap", "application/x-silverlight-app");
OC.MimeType.set(".sit", "application/x-stuffit");
OC.MimeType.set(".sitx", "application/x-stuffitx");
OC.MimeType.set(".sv4cpio", "application/x-sv4cpio");
OC.MimeType.set(".sv4crc", "application/x-sv4crc");
OC.MimeType.set(".tar", "application/x-tar");
OC.MimeType.set(".tcl", "application/x-tcl");
OC.MimeType.set(".tex", "application/x-tex");
OC.MimeType.set(".tfm", "application/x-tex-tfm");
OC.MimeType.set(".texinfo,.texi", "application/x-texinfo");
OC.MimeType.set(".ustar", "application/x-ustar");
OC.MimeType.set(".src", "application/x-wais-source");
OC.MimeType.set(".der,.crt", "application/x-x509-ca-cert");
OC.MimeType.set(".fig", "application/x-xfig");
OC.MimeType.set(".xpi", "application/x-xpinstall");
OC.MimeType.set(".xenc", "application/xenc+xml");
OC.MimeType.set(".xhtml,.xht", "application/xhtml+xml");
OC.MimeType.set(".xml,.xsl", "application/xml");
OC.MimeType.set(".dtd", "application/xml-dtd");
OC.MimeType.set(".xop", "application/xop+xml");
OC.MimeType.set(".xslt", "application/xslt+xml");
OC.MimeType.set(".xspf", "application/xspf+xml");
OC.MimeType.set(".mxml,.xhvml,.xvml,.xvm", "application/xv+xml");
OC.MimeType.set(".zip", "application/zip");
OC.MimeType.set(".adp", "audio/adpcm");
OC.MimeType.set(".au,.snd", "audio/basic");
OC.MimeType.set(".mid,.midi,.kar,.rmi", "audio/midi");
OC.MimeType.set(".mp4a", "audio/mp4");
OC.MimeType.set(".m4a,.m4p", "audio/mp4a-latm");
OC.MimeType.set(".mpga,.mp2,.mp2a,.mp3,.m2a,.m3a", "audio/mpeg");
OC.MimeType.set(".oga,.ogg,.spx", "audio/ogg");
OC.MimeType.set(".eol", "audio/vnd.digital-winds");
OC.MimeType.set(".dts", "audio/vnd.dts");
OC.MimeType.set(".dtshd", "audio/vnd.dts.hd");
OC.MimeType.set(".lvp", "audio/vnd.lucent.voice");
OC.MimeType.set(".pya", "audio/vnd.ms-playready.media.pya");
OC.MimeType.set(".ecelp4800", "audio/vnd.nuera.ecelp4800");
OC.MimeType.set(".ecelp7470", "audio/vnd.nuera.ecelp7470");
OC.MimeType.set(".ecelp9600", "audio/vnd.nuera.ecelp9600");
OC.MimeType.set(".aac", "audio/x-aac");
OC.MimeType.set(".aif,.aiff,.aifc", "audio/x-aiff");
OC.MimeType.set(".m3u", "audio/x-mpegurl");
OC.MimeType.set(".wax", "audio/x-ms-wax");
OC.MimeType.set(".wma", "audio/x-ms-wma");
OC.MimeType.set(".ram,.ra", "audio/x-pn-realaudio");
OC.MimeType.set(".rmp", "audio/x-pn-realaudio-plugin");
OC.MimeType.set(".wav", "audio/x-wav");
OC.MimeType.set(".cdx", "chemical/x-cdx");
OC.MimeType.set(".cif", "chemical/x-cif");
OC.MimeType.set(".cmdf", "chemical/x-cmdf");
OC.MimeType.set(".cml", "chemical/x-cml");
OC.MimeType.set(".csml", "chemical/x-csml");
OC.MimeType.set(".xyz", "chemical/x-xyz");
OC.MimeType.set(".bmp", "image/bmp");
OC.MimeType.set(".cgm", "image/cgm");
OC.MimeType.set(".g3", "image/g3fax");
OC.MimeType.set(".gif", "image/gif");
OC.MimeType.set(".ief", "image/ief");
OC.MimeType.set(".jp2", "image/jp2");
OC.MimeType.set(".jpeg,.jpg,.jpe", "image/jpeg");
OC.MimeType.set(".pict,.pic,.pct", "image/pict");
OC.MimeType.set(".png", "image/png");
OC.MimeType.set(".btif", "image/prs.btif");
OC.MimeType.set(".svg,.svgz", "image/svg+xml");
OC.MimeType.set(".tiff,.tif", "image/tiff");
OC.MimeType.set(".psd", "image/vnd.adobe.photoshop");
OC.MimeType.set(".djvu,.djv", "image/vnd.djvu");
OC.MimeType.set(".dwg", "image/vnd.dwg");
OC.MimeType.set(".dxf", "image/vnd.dxf");
OC.MimeType.set(".fbs", "image/vnd.fastbidsheet");
OC.MimeType.set(".fpx", "image/vnd.fpx");
OC.MimeType.set(".fst", "image/vnd.fst");
OC.MimeType.set(".mmr", "image/vnd.fujixerox.edmics-mmr");
OC.MimeType.set(".rlc", "image/vnd.fujixerox.edmics-rlc");
OC.MimeType.set(".mdi", "image/vnd.ms-modi");
OC.MimeType.set(".npx", "image/vnd.net-fpx");
OC.MimeType.set(".wbmp", "image/vnd.wap.wbmp");
OC.MimeType.set(".xif", "image/vnd.xiff");
OC.MimeType.set(".ras", "image/x-cmu-raster");
OC.MimeType.set(".cmx", "image/x-cmx");
OC.MimeType.set(".fh,.fhc,.fh4,.fh5,.fh7", "image/x-freehand");
OC.MimeType.set(".ico", "image/x-icon");
OC.MimeType.set(".pntg,.pnt,.mac", "image/x-macpaint");
OC.MimeType.set(".pcx", "image/x-pcx");
//OC.MimeType.set(".pic,.pct", "image/x-pict");
OC.MimeType.set(".pnm", "image/x-portable-anymap");
OC.MimeType.set(".pbm", "image/x-portable-bitmap");
OC.MimeType.set(".pgm", "image/x-portable-graymap");
OC.MimeType.set(".ppm", "image/x-portable-pixmap");
OC.MimeType.set(".qtif,.qti", "image/x-quicktime");
OC.MimeType.set(".rgb", "image/x-rgb");
OC.MimeType.set(".xbm", "image/x-xbitmap");
OC.MimeType.set(".xpm", "image/x-xpixmap");
OC.MimeType.set(".xwd", "image/x-xwindowdump");
OC.MimeType.set(".eml,.mime", "message/rfc822");
OC.MimeType.set(".igs,.iges", "model/iges");
OC.MimeType.set(".msh,.mesh,.silo", "model/mesh");
OC.MimeType.set(".dwf", "model/vnd.dwf");
OC.MimeType.set(".gdl", "model/vnd.gdl");
OC.MimeType.set(".gtw", "model/vnd.gtw");
OC.MimeType.set(".mts", "model/vnd.mts");
OC.MimeType.set(".vtu", "model/vnd.vtu");
OC.MimeType.set(".wrl,.vrml", "model/vrml");
OC.MimeType.set(".ics,.ifb", "text/calendar");
OC.MimeType.set(".css", "text/css");
OC.MimeType.set(".csv", "text/csv");
OC.MimeType.set(".html,.htm", "text/html");
OC.MimeType.set(".txt,.text,.conf,.def,.list,.log,.in", "text/plain");
OC.MimeType.set(".dsc", "text/prs.lines.tag");
OC.MimeType.set(".rtx", "text/richtext");
OC.MimeType.set(".sgml,.sgm", "text/sgml");
OC.MimeType.set(".tsv", "text/tab-separated-values");
OC.MimeType.set(".t,.tr,.roff,.man,.me,.ms", "text/troff");
OC.MimeType.set(".uri,.uris,.urls", "text/uri-list");
OC.MimeType.set(".curl", "text/vnd.curl");
OC.MimeType.set(".dcurl", "text/vnd.curl.dcurl");
OC.MimeType.set(".scurl", "text/vnd.curl.scurl");
OC.MimeType.set(".mcurl", "text/vnd.curl.mcurl");
OC.MimeType.set(".fly", "text/vnd.fly");
OC.MimeType.set(".flx", "text/vnd.fmi.flexstor");
OC.MimeType.set(".gv", "text/vnd.graphviz");
OC.MimeType.set(".3dml", "text/vnd.in3d.3dml");
OC.MimeType.set(".spot", "text/vnd.in3d.spot");
OC.MimeType.set(".jad", "text/vnd.sun.j2me.app-descriptor");
OC.MimeType.set(".wml", "text/vnd.wap.wml");
OC.MimeType.set(".wmls", "text/vnd.wap.wmlscript");
OC.MimeType.set(".s,.asm", "text/x-asm");
OC.MimeType.set(".c,.cc,.cxx,.cpp,.h,.hh,.dic", "text/x-c");
OC.MimeType.set(".f,.for,.f77,.f90", "text/x-fortran");
OC.MimeType.set(".p,.pas", "text/x-pascal");
OC.MimeType.set(".java", "text/x-java-source");
OC.MimeType.set(".etx", "text/x-setext");
OC.MimeType.set(".uu", "text/x-uuencode");
OC.MimeType.set(".vcs", "text/x-vcalendar");
OC.MimeType.set(".vcf", "text/x-vcard");
OC.MimeType.set(".3gp", "video/3gpp");
OC.MimeType.set(".3g2", "video/3gpp2");
OC.MimeType.set(".h261", "video/h261");
OC.MimeType.set(".h263", "video/h263");
OC.MimeType.set(".h264", "video/h264");
OC.MimeType.set(".jpgv", "video/jpeg");
OC.MimeType.set(".jpm,.jpgm", "video/jpm");
OC.MimeType.set(".mj2,.mjp2", "video/mj2");
OC.MimeType.set(".mp4,.mp4v,.mpg4,.m4v", "video/mp4");
OC.MimeType.set(".webm", "video/webm");
OC.MimeType.set(".mpeg,.mpg,.mpe,.m1v,.m2v", "video/mpeg");
OC.MimeType.set(".ogv", "video/ogg");
OC.MimeType.set(".qt,.mov", "video/quicktime");
OC.MimeType.set(".fvt", "video/vnd.fvt");
OC.MimeType.set(".mxu,.m4u", "video/vnd.mpegurl");
OC.MimeType.set(".pyv", "video/vnd.ms-playready.media.pyv");
OC.MimeType.set(".viv", "video/vnd.vivo");
OC.MimeType.set(".dv,.dif", "video/x-dv");
OC.MimeType.set(".f4v", "video/x-f4v");
OC.MimeType.set(".fli", "video/x-fli");
OC.MimeType.set(".flv", "video/x-flv");
//OC.MimeType.set(".m4v", "video/x-m4v");
OC.MimeType.set(".asf,.asx", "video/x-ms-asf");
OC.MimeType.set(".wm", "video/x-ms-wm");
OC.MimeType.set(".wmv", "video/x-ms-wmv");
OC.MimeType.set(".wmx", "video/x-ms-wmx");
OC.MimeType.set(".wvx", "video/x-ms-wvx");
OC.MimeType.set(".avi", "video/x-msvideo");
OC.MimeType.set(".movie", "video/x-sgi-movie");
OC.MimeType.set(".ice", "x-conference/x-cooltalk");
		
// Not really sure about these...
OC.MimeType.set(".epub", "application/epub+zip");
OC.MimeType.set(".mobi", "application/x-mobipocket-ebook");

// Here's some common special cases without filename extensions
OC.MimeType.set("README,LICENSE,COPYING,TODO,ABOUT,AUTHORS,CONTRIBUTORS",
	"text/plain");
OC.MimeType.set("manifest,.manifest,.mf,.appcache", "text/cache-manifest");

// Note: Chrome now defines window.MimeType, only define for legacy usage.
if (self.MimeType === undefined) {
	self.MimeType = MimeType;
}
// Note: Per Hypercuded switch to camel case to avoid Chrome issues.
if (self.mimeType === undefined) {
	self.mimeType = MimeType;
}
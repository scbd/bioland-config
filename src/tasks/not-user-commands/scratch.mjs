


function cearCacheViaSql(){
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_bootstrap'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_config'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_container'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_data'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_default'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_discovery'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_discovery_migration'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_dynamic_page_cache'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_entity'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_file_mdm'\"`)

  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_menu'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_migrate'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_page'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_render'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_rest'\"`)
  execSync(`ddev drush -y @${site} sql-query \"'TRUNCATE TABLE cache_toolbar'\"`)
}
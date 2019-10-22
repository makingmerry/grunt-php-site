      </div>
      <div class="
        pos-relative z-2
        g12-12">
        <?php // Footer: ?>
        <div class="m-top-5">
          <?php snippet('footers/foot'); ?>
        </div>
      </div>
    </div>

    <?php // Global JS: ?>
    <?php if (file_exists(js('global', true))): ?>
      <script src="<?php echo js('global'); ?>"></script>
    <?php endif; ?>
  </body>
</html>